import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CreateReminderInput, Reminder } from "@/types/reminder";
import { ReminderForm } from "./ReminderForm";

interface ReminderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reminder?: Reminder;
    onSubmit: (data: CreateReminderInput) => void;
    isSubmitting?: boolean;
}

export function ReminderDialog({
    open,
    onOpenChange,
    reminder,
    onSubmit,
    isSubmitting,
}: ReminderDialogProps) {
    const isEditing = !!reminder;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {isEditing ? "Edit Reminder" : "Create New Reminder"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the details of your reminder below."
                            : "Set up a new reminder. We'll call the phone number and speak your message at the scheduled time."}
                    </DialogDescription>
                </DialogHeader>
                <ReminderForm
                    reminder={reminder}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
}
