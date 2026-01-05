import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">Oops! Page not found</h1>
                <p className="mb-4 text-xl text-muted-foreground">Could not find requested resource</p>
                <Link href="/" className="text-primary">Return Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
