"use client";
import Link from "next/link";

export default function RightNav({ email }: { email: string }) {

    if (email) {
        return (
            <nav className="flex gap-4 items-center">
                <Link href={'/dashboard'} className="bg-blue-600 text-white py-2 rounded-full px-4">
                    Dashboard
                </Link>

                {/* this was s hit ton difficult, seems like anchor doesn't cache like Link */}
                <a href={'/api/logout'}>Logout</a>
            </nav>
        );
    }
    if (!email) {
        return (
            <nav className="flex gap-4 items-center">
                <Link href={'/api/auth'}>Sign in</Link >
                <Link href={'/about'} className="bg-blue-600 text-white py-2 rounded-full px-4">Get started</Link>
            </nav >
        )
    };
}