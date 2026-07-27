export function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-canvas">
            <div className="relative">
                <div className="absolute inset-0 h-24 w-24 rounded-full border border-line" />

                <div className="absolute inset-0 h-24 w-24 rounded-full border-2 border-transparent border-t-ink animate-spin" />

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface">
                    <img
                        src="https://legumexappsapi-storage.s3.us-east-1.amazonaws.com/resources/LOGO_LX_V2.png"
                        alt="Logo"
                        className="h-14 w-14 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
