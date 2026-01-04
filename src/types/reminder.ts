export type ReminderStatus = 'scheduled' | 'completed' | 'failed';

export interface Reminder {
    id: string;
    title: string;
    message: string;
    phoneNumber: string;
    scheduledAt: Date;
    timezone: string;
    status: ReminderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateReminderInput {
    title: string;
    message: string;
    phoneNumber: string;
    scheduledAt: Date;
    timezone: string;
}

export interface UpdateReminderInput extends Partial<CreateReminderInput> {
    id: string;
}
