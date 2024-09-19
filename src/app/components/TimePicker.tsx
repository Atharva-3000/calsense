"use client";
import { weekdaysShortNames } from "@/libs/shared"
import { BookingTimes } from "@/libs/types"
import { format, getDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react";

export default function TimePicker(
    { bookingTimes, }: { bookingTimes: BookingTimes }
) {
    const currentDate = new Date();
    const [activeMonthIndex, setActiveMonthIndex] = useState(currentDate.getMonth() - 1);
    const [activeYear, setActiveYear] = useState(currentDate.getFullYear());
    const firstDayOfCurrentMonth = new Date(activeYear, activeMonthIndex, 1);
    const firstDayOfCurrentMonthWeekdayIndex = getDay(firstDayOfCurrentMonth);
    const emptyDaysCount = firstDayOfCurrentMonthWeekdayIndex === 0 ? 6 : firstDayOfCurrentMonthWeekdayIndex - 1;
    return (
        <div className="flex gap-4">
            <div className="grow">
                <div className="flex items-center">
                    <span className="grow">
                        {format(new Date(activeYear, activeMonthIndex), "MMMM")} {activeYear} </span>
                    <button><ChevronLeft /></button>
                    <button><ChevronRight /></button>
                    {emptyDaysCount}
                    {JSON.stringify(firstDayOfCurrentMonthWeekdayIndex)}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                    
                    {weekdaysShortNames.map((weekdaysShortName) => {
                        return (
                            <div
                                key={weekdaysShortName}
                                className="uppercase text-sm text-gray-500 font-bold"
                            >{weekdaysShortName}
                            </div>)
                    })}
                </div>
            </div>
            <div className="border border-black">
                time button
            </div>
        </div>
    )
}