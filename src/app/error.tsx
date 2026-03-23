"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to console natively
        console.error("Global Application Error Intercepted:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-black text-luxury-white p-6">
            <div className="glass p-10 flex flex-col items-center text-center rounded-xl max-w-2xl border border-red-500/20">
                <h2 className="text-3xl font-display mb-4 text-red-400">Something went wrong!</h2>
                <p className="text-luxury-muted font-body mb-8 whitespace-pre-wrap font-mono text-sm p-4 bg-black/40 rounded-lg text-left overflow-auto w-full">
                    {error.message}
                </p>
                <button
                    className="btn-gold px-8 py-3"
                    onClick={() => reset()}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
