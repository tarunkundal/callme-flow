import { ReminderListSkeleton } from '@/components/ui/loading-skeleton'

const loading = () => {
    return (
        <ReminderListSkeleton count={5} />
    )
}

export default loading