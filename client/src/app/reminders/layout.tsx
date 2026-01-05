export default function RemindersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* If something comman that had to be desgined for this particular route then it will go here */}
            {children}
        </div>
    );
}
