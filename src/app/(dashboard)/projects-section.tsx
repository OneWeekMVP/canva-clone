"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { 
  AlertTriangle, 
  CopyIcon, 
  FileIcon, 
  Loader, 
  MoreHorizontal, 
  Search,
  Trash,
  Pencil
} from "lucide-react";
import { toast } from "sonner";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";

export const ProjectsSection = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this project.",
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const duplicateMutation = useDuplicateProject();
  const removeMutation = useDeleteProject();
  const updateMutation = useUpdateProject(editingId || "");
  const router = useRouter();

  const startEditing = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleRename = () => {
    if (editingId && editingName.trim()) {
      updateMutation.mutate(
        { name: editingName.trim() },
        {
          onSuccess: () => {
            toast.success("Project renamed successfully");
            setEditingId(null);
            setEditingName("");
          },
          onError: () => {
            toast.error("Failed to rename project");
          },
        }
      );
    } else {
      setEditingId(null);
      setEditingName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditingName("");
    }
  };

  const onCopy = (id: string) => {
    duplicateMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Project copied successfully");
        },
        onError: () => {
          toast.error("Failed to copy project");
        },
      }
    );
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      removeMutation.mutate(
        { id },
        {
          onSuccess: () => {
            toast.success("Project deleted successfully");
          },
          onError: () => {
            toast.error("Failed to delete project");
          },
        }
      );
    }
  };

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetProjects();

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Recent projects
        </h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Recent projects
        </h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to load projects
          </p>
        </div>
      </div>
    )
  }

  if (
    !data.pages.length ||
    !data.pages[0].data.length
  ) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Recent projects
        </h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            No projects found
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4"> 
      <ConfirmDialog />
      <h3 className="font-semibold text-lg">
        Recent projects
      </h3>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => {
                const isEditing = editingId === project.id;

                return (
                  <TableRow key={project.id}>
                    <TableCell
                      onClick={isEditing ? undefined : () => router.push(`/editor/${project.id}`)}
                      className="font-medium flex items-center gap-x-2 cursor-pointer"
                    >
                      <FileIcon className="size-6" />
                      {isEditing ? (
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={handleRename}
                          onKeyDown={handleKeyDown}
                          className="h-8 border-blue-500 focus-visible:ring-blue-500"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        project.name
                      )}
                    </TableCell>
                    <TableCell
                      onClick={() => router.push(`/editor/${project.id}`)}
                      className="hidden md:table-cell cursor-pointer"
                    >
                      {project.width} x {project.height} px
                    </TableCell>
                    <TableCell
                      onClick={() => router.push(`/editor/${project.id}`)}
                      className="hidden md:table-cell cursor-pointer"
                    >
                      {formatDistanceToNow(project.updatedAt, {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            disabled={false}
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60">
                          <DropdownMenuItem
                            className="h-10 cursor-pointer"
                            disabled={duplicateMutation.isPending}
                            onClick={() => onCopy(project.id)}
                          >
                            <CopyIcon className="size-4 mr-2" />
                            Make a copy
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-10 cursor-pointer"
                            disabled={updateMutation.isPending}
                            onSelect={(e) => {
                              e.preventDefault();
                              startEditing(project.id, project.name);
                            }}
                          >
                            <Pencil className="size-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-10 cursor-pointer"
                            disabled={removeMutation.isPending}
                            onClick={() => onDelete(project.id)}
                          >
                            <Trash className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};