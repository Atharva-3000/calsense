'use client';

import { useState } from "react";
import { BookingTimes, WeekdayName } from "@/libs/types";
import { weekdaysNames } from "@/libs/shared";
import TimeSelect from "./TimeSelect";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EventTypeForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [length, setLength] = useState(30);
    const [bookingTimes, setBookingTimes] = useState<BookingTimes>({});
    const router = useRouter();

    // @ts-expect-error : this is a comment to ignore the error
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post('/api/event-types', {
            title, description, length, bookingTimes
        });
        if(response.data){
            router.push('/dashboard/event-types');
        }
    }

    function handleBookingTimeChange(
        day: WeekdayName,
        val: string | boolean,
        prop: 'from' | 'to' | 'active'
    ) {
        setBookingTimes(oldBookingTimes => {
            const newBookingTimes: BookingTimes = { ...oldBookingTimes };
            if (!newBookingTimes[day]) {
                newBookingTimes[day] = { from: '00:00', to: '00:00', active: false };
            }
            // @ts-expect-error : it just works
            newBookingTimes[day][prop] = val;
            return newBookingTimes
        });
    }


    return (
        <form className=" p-2 bg-gray-200 rounded-lg" onSubmit={handleSubmit}>
            create new event type:
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>
                        <span>
                            Title
                        </span>
                        <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label>
                        <span>
                            Description
                        </span>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="description"></textarea>
                    </label>
                    <label>
                        <span>
                            Event Length (in mins)
                        </span>
                        <input type="number"
                            value={length}
                            onChange={e => setLength(parseInt(e.target.value))}
                            placeholder="30" />
                    </label>
                </div>
                <div>
                    <span className="label">
                        Availability:
                    </span>
                    <div className="grid gap-2">
                        {weekdaysNames.map((day) => {
                            const active = bookingTimes?.[day]?.active;
                            return (
                                <div
                                    key={day}
                                    className=
                                    "grid grid-cols-2 gap-2 items-center"
                                >
                                    <label className="flex gap-1 !mb-0 !p-0">
                                        <input type="checkbox"
                                            value={1}
                                            checked={bookingTimes[day]?.active}
                                            onChange={e => {
                                                handleBookingTimeChange(day, e.target.checked, 'active'
                                                )
                                            }
                                            }
                                        />
                                        {day}
                                    </label>
                                    <div className={clsx(
                                        "inline-flex gap-2 items-center ml-2",
                                        active ? '' : 'opacity-40'
                                    )}>
                                        <TimeSelect
                                            value={bookingTimes?.[day]?.from || '00:00'}
                                            onChange={
                                                val =>
                                                    handleBookingTimeChange(day, val, 'from')
                                            }
                                            step={30} />
                                        <span>
                                            -
                                        </span>
                                        <TimeSelect
                                            value={bookingTimes?.[day]?.to || '00:00'}
                                            onChange={
                                                val =>
                                                    handleBookingTimeChange(day, val, 'to')}
                                            step={30} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-2">
                <button type="submit" onClick={handleSubmit} className="btn-blue !px-8">
                    Save
                </button>
            </div>
        </form>
    )
}