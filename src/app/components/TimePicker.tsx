"use client";
import { weekdaysShortNames } from "@/libs/shared"
import { BookingTimes, WeekdayName } from "@/libs/types"
import clsx from "clsx";
import { addDays, addMonths, format, getDay, isEqual, isFuture, isLastDayOfMonth, isToday, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react";

export default function TimePicker(
    { bookingTimes, }: { bookingTimes: BookingTimes }
) {
    const currentDate = new Date();
    function prevMonth() {
        setActiveMonthDate(prev => {
            const newActiveMonth = subMonths(prev, 1);
            setActiveMonthIndex(newActiveMonth.getMonth());
            setActiveYear(newActiveMonth.getFullYear());
            return newActiveMonth;
        })
    }

    function nextMonth() {
        setActiveMonthDate(prev => {
            const newActiveMonth = addMonths(prev, 1);
            setActiveMonthIndex(newActiveMonth.getMonth());
            setActiveYear(newActiveMonth.getFullYear());
            return newActiveMonth;
        })
    }
    function handleDayClick(day: Date) {
        setSelectedDay(day);
    }

    const [activeMonthDate, setActiveMonthDate] = useState(currentDate);
    const [activeMonthIndex, setActiveMonthIndex] = useState(activeMonthDate.getMonth() - 1);
    const [activeYear, setActiveYear] = useState(activeMonthDate.getFullYear());
    const firstDayOfCurrentMonth = new Date(activeYear, activeMonthIndex, 1);
    const firstDayOfCurrentMonthWeekdayIndex = getDay(firstDayOfCurrentMonth);
    const emptyDaysCount = firstDayOfCurrentMonthWeekdayIndex === 0 ? 6 : firstDayOfCurrentMonthWeekdayIndex - 1;
    const emptyDaysArr = (new Array(emptyDaysCount)).fill('', 0, emptyDaysCount);
    const daysNumbers = [firstDayOfCurrentMonth];
    const [selectedDay, setSelectedDay] = useState<null | Date>(null);


    while (!isLastDayOfMonth(daysNumbers[daysNumbers.length - 1])) {
        const lastAddedDay = daysNumbers[daysNumbers.length - 1];
        daysNumbers.push(addDays(lastAddedDay, 1));
    }
    let selectedDayConfig = null;
    if (selectedDay) {
        const weekDayNameIndex = format(selectedDay, 'EEEE').toLowerCase() as WeekdayName;
        selectedDayConfig = bookingTimes?.[weekDayNameIndex];
    }
    return (
        <div className="flex gap-4">
            <div className="">
                <div className="flex items-center">
                    <span className="grow">
                        {format(new Date(activeYear, activeMonthIndex), "MMMM")} {activeYear} </span>
                    <button >
                        <ChevronLeft onClick={prevMonth} />
                    </button>
                    <button>
                        <ChevronRight
                            onClick={nextMonth}
                        />
                    </button>
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
                    {daysNumbers.map(n => {
                        const weekDayNameIndex = format(n, 'EEEE').toLowerCase() as WeekdayName;
                        const weekDayConfig = bookingTimes?.[weekDayNameIndex];
                        const isActiveInBookingTimes = weekDayConfig?.active;

                        const canBeBooked = isFuture(n) && isActiveInBookingTimes;
                        const isSelected = selectedDay && isEqual(n, selectedDay);

                        return (
                            <div className="text-center text-sm text-gray-400 font-bold  ">
                                <button
                                    disabled={!canBeBooked}
                                    onClick={() => handleDayClick(n)
                                    }
                                    className={clsx(
                                        " w-8 h-8 rounded-full inline-flex items-center justify-center",
                                        canBeBooked && !isSelected ? 'bg-blue-200 text-blue-700' : '',
                                        isToday(n) && !isSelected ? ' bg-gray-300 text-gray-500' : '',

                                        isSelected
                                            ?
                                            'bg-blue-500 text-white' : "",

                                    )}>
                                    {format(n, 'd')}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="border border-black">
                <pre>
                    {JSON.stringify(selectedDayConfig, null, 2)}
                </pre>
            </div>
        </div>
    )
}