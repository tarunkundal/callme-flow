"use client";

import { useState } from "react";
import type { Reminder, CreateReminderInput } from "@/types/reminder";
import { useToast } from "@/hooks/useToast";
import { useReminders } from "@/hooks/useReminders";
import { ReminderFilters } from "./ReminderFilters";
import { ReminderList } from "./ReminderList";
import { ReminderDialog } from "./ReminderDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Header } from "../Header";

export function RemindersPage() {
    const { toast } = useToast();
    const {
        reminders,
        isLoading,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        counts,
        createReminder,
        updateReminder,
        deleteReminder,
    } = useReminders();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState<Reminder>();
    const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateNew = () => {
        setSelectedReminder(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (reminder: Reminder) => {
        setSelectedReminder(reminder);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (reminder: Reminder) => {
        setReminderToDelete(reminder);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: CreateReminderInput) => {
        setIsSubmitting(true);
        try {
            if (selectedReminder) {
                await updateReminder(selectedReminder.id, data);
                toast({ title: "Reminder updated" });
            } else {
                await createReminder(data);
                toast({ title: "Reminder created" });
            }
            setIsFormOpen(false);
        } catch {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!reminderToDelete) return;

        setIsSubmitting(true);
        try {
            await deleteReminder(reminderToDelete.id);
            toast({ title: "Reminder deleted" });
            setIsDeleteOpen(false);
        } catch {
            toast({
                title: "Error",
                description: "Failed to delete reminder",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* header need to be the part of layout but for now we place here */}
            <Header onCreateNew={handleCreateNew} />
            <div className="mt-4 pb-4 container px-4 py-1 sm:px-6 lg:px-8">
                {/* Filters */}
                <ReminderFilters
                    activeFilter={filter}
                    onFilterChange={setFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    counts={counts}
                    className="mb-6"
                />

                {/* List */}
                <ReminderList
                    reminders={reminders}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    onCreateNew={handleCreateNew}
                />

                {/* Dialogs */}
                <ReminderDialog
                    open={isFormOpen}
                    onOpenChange={setIsFormOpen}
                    reminder={selectedReminder}
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                />

                <DeleteConfirmDialog
                    open={isDeleteOpen}
                    onOpenChange={setIsDeleteOpen}
                    reminder={reminderToDelete}
                    onConfirm={handleDeleteConfirm}
                    isDeleting={isSubmitting}
                />
            </div>
        </>
    );
}
