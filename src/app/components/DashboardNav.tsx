"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({ username }: {
    username?: string;
}) {
    const pathName = usePathname();
    const isEventTypesPage = pathName.includes('event-types');
    const isBookedEventsPage = pathName.includes('booked-events');
    return (
        <div className="flex gap-4 justify-center">
            <Link
                className={
                    clsx(
                        'rounded-full px-4 py-2',
                        pathName === '/dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200',
                    )
                }
                href={'/dashboard'}>
                Profile
            </Link>
            {username && (
                <>
                    <Link href={"/dashboard/booked-events"}
                        className={
                            clsx(
                                'rounded-full px-4 py-2',
                                isBookedEventsPage ? 'bg-blue-600 text-white' : 'bg-gray-200',
                            )
                        }>
                        Booked Events
                    </Link>

                    <Link className={clsx('rounded-full px-4 py-2', isEventTypesPage ? 'bg-blue-600 text-white' : 'bg-gray-200')}
                        href={'/dashboard/event-types'}>
                        Event Types
                    </Link>
                </>
            )}

        </div>
    )
}