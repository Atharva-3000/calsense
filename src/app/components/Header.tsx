import { CalendarRangeIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex gap-4 justify-between py-6 text-gray-600">
            <div className="flex gap-10 items-center">
                <Link href={'/'} className="text-blue-600 font-bold text-2xl">
                    <span className="flex items-center gap-1">
                        <CalendarRangeIcon size={28} />
                        Calsense
                    </span>
                </Link>
                <nav className="flex gap-4">
                    <Link href={'/features'}>Features</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/pricing'}>Pricing</Link>
                </nav>
            </div>
            <nav className="flex gap-4 items-center">
                <Link href={'/signin'}>Sign in</Link>
                <Link href={'/signup'} className="bg-blue-600 text-white py-2 rounded-full px-4">Get started</Link>
            </nav>
        </header>
    )
}