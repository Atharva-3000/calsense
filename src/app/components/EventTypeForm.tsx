'use client';

import TimeSelect from "./TimeSelect";

export default function EventTypeForm() {

    const WeekdaysNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <form className=" p-2 bg-gray-200 rounded-lg">
            create new event type:
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>
                        <span>
                            Title
                        </span>
                        <input type="text" placeholder="title" />
                    </label>
                    <label>
                        <span>
                            Description
                        </span>
                        <textarea placeholder="description"></textarea>
                    </label>
                    <label>
                        <span>
                            Event Length (in mins)
                        </span>
                        <input type="number" placeholder="30" />
                    </label>
                </div>
                <div>
                    <span className="label">
                        Availability:
                    </span>
                    <div className="grid grid-cols-2 gap-2 items-center">
                        {WeekdaysNames.map((day) => (
                            <>
                                {day}
                                <div className="inline-flex gap-2 items-center ml-2">
                                    <TimeSelect step={30} />
                                    <span> - </span>
                                    <TimeSelect step={30} />
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-2">
                <button className="btn-blue !px-8">
                    Save
                </button>
            </div>
        </form>
    )
}