"use client";
import { weekdaysShortNames } from "@/libs/shared"
import { BookingTimes } from "@/libs/types"
import { addDays, format, getDay, isLastDayOfMonth } from "date-fns";
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
    const emptyDaysArr = (new Array(emptyDaysCount)).fill('', 0, emptyDaysCount);
    const daysNumbers = [firstDayOfCurrentMonth];
    do {
        const lastAddedDay = daysNumbers[daysNumbers.length - 1];
        daysNumbers.push(addDays(lastAddedDay, 1));
    }
    while (!isLastDayOfMonth(daysNumbers[daysNumbers.length - 1]));

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
                <div className="inline-grid grid-cols-7 gap-2 mt-2">
                    {weekdaysShortNames.map((weekdaysShortName) => {
                        return (
                            <div
                                key={weekdaysShortName}
                                className="text-center uppercase text-sm text-gray-500 font-bold"
                            >{weekdaysShortName}
                            </div>)
                    })}
                    {emptyDaysArr.map(empty => (
                        <div />
                    ))}
                    {daysNumbers.map(n => (
                        <div className="text-center text-sm text-gray-500 font-bold  ">
                            <button
                                className="bg-gray-200 w-8 h-8 rounded-full inline-flex items-center justify-center">
                                {format(n, 'd')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border border-black">
                time button
            </div>
        </div>
    )
}