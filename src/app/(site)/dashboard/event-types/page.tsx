'use server';
import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import { Plus } from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";



export default async function EventTypesPage() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(mongoUri);
    const email = await session().get('email');
    const eventTypes = await EventTypeModel.find({ email });
    return (
        <div>
            <DashboardNav />
            <div className="border border-b-0  rounded-xl overflow-hidden mb-4 mt-4">
                {eventTypes.map(eventType => (
                    <div
                        className="block p-2 border-b">
                        <Link href={'/dashboard/event-types/edit/' + eventType.id}>
                            {eventType.title}
                        </Link>
                        <span className="text-gray-400 ml-4 text-sm">
                            http://localhost:3000/username/{eventType.uri}</span>
                    </div>
                ))}
            </div>
            <Link className="btn-gray" href={'/dashboard/event-types/new'}>
                <Plus size={18} />
                New Event Type
            </Link>
        </div>
    )
}