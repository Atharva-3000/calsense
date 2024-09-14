"use server";
import { session } from "@/libs/session";
import { CalendarRangeIcon } from "lucide-react";
import Link from "next/link";
import RightNav from "./RightNav";

export default async function Header() {
    const email = await session().get('email');
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
           <RightNav email={email}/>
        </header>
    )
}