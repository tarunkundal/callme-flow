import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { convertToUTC, TIMEZONES, today } from "@/data/helpers";
import { cn } from "@/lib/utils";
import { CreateReminderInput, Reminder } from "@/types/reminder";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Globe, MessageSquare, Phone, Type } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";


// Phone validation regex (E.164 format)
const phoneRegex = /^\+[1-9]\d{1,14}$/;

const formSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    message: z
        .string()
        .min(1, "Message is required")
        .max(500, "Message must be less than 500 characters"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .regex(phoneRegex, "Please enter a valid phone number in E.164 format (e.g., +14155552671)"),
    date: z.date({
        required_error: "Please select a date",
    }),
    time: z.string().min(1, "Please select a time"),
    timezone: z.string().min(1, "Please select a timezone"),
}).refine(
    (data) => {
        const [hours, minutes] = data.time.split(":").map(Number);
        const scheduledDate = new Date(data.date);
        scheduledDate.setHours(hours, minutes, 0, 0);
        return scheduledDate > new Date();
    },
    {
        message: "Scheduled time must be in the future",
        path: ["time"],
    }
);

type FormValues = z.infer<typeof formSchema>;

interface ReminderFormProps {
    reminder?: Reminder;
    onSubmit: (data: CreateReminderInput) => void;
    onCancel?: () => void;
    isSubmitting?: boolean;
}

export function ReminderForm({
    reminder,
    onSubmit,
    onCancel,
    isSubmitting = false,
}: ReminderFormProps) {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const defaultTimezone = TIMEZONES.find(tz => tz.value === userTimezone)?.value || "America/New_York";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: reminder?.title || "",
            message: reminder?.message || "",
            phoneNumber: reminder?.phoneNumber || "",
            date: reminder?.scheduledAt ? new Date(reminder.scheduledAt) : undefined,
            time: reminder?.scheduledAt
                ? format(new Date(reminder.scheduledAt), "HH:mm")
                : "",
            timezone: reminder?.timezone || defaultTimezone,
        },
    });

    const handleSubmit = (values: FormValues) => {
        const scheduledAtUtc = convertToUTC(
            values.date,
            values.time,
            values.timezone
        );

        onSubmit({
            title: values.title,
            message: values.message,
            phoneNumber: values.phoneNumber,
            scheduledAt: scheduledAtUtc,
            timezone: values.timezone,
        });
    };

    // Generate time options in 15-minute intervals
    const timeOptions: { value: string; label: string; }[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const hour = h.toString().padStart(2, "0");
            const minute = m.toString().padStart(2, "0");
            const value = `${hour}:${minute}`;
            const label = format(new Date().setHours(h, m), "h:mm a");
            timeOptions.push({ value, label });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Type className="h-4 w-4 text-muted-foreground" />
                                Title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Doctor's appointment, Birthday call..."
                                    {...field}
                                    className="bg-card"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                Reminder Message
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="This is the message that will be spoken during the call..."
                                    className="min-h-[100px] resize-none bg-card"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This message will be spoken when the call is made.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                Phone Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="+14155552671"
                                    {...field}
                                    className="font-mono bg-card"
                                />
                            </FormControl>
                            <FormDescription>
                                Enter phone number in E.164 format (e.g., +1 for US)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Date and Time Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    Date
                                </FormLabel>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal bg-card",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                if (!date) return;

                                                const normalized = new Date(
                                                    date.getFullYear(),
                                                    date.getMonth(),
                                                    date.getDate(),
                                                    0,
                                                    0,
                                                    0,
                                                    0
                                                );

                                                field.onChange(normalized);
                                            }}
                                            disabled={{ before: today() }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Time */}
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    Time
                                </FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="bg-card">
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-[280px]">
                                        {timeOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Timezone */}
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                Timezone
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-card">
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {TIMEZONES.map((tz) => (
                                        <SelectItem key={tz.value} value={tz.value}>
                                            {tz.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onCancel}
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                {reminder ? "Updating..." : "Creating..."}
                            </span>
                        ) : (
                            <span>{reminder ? "Update Reminder" : "Create Reminder"}</span>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
