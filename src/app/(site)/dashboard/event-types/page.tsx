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
            Hello from Event Types Page
            {JSON.stringify(eventTypes)}
            <br />
            <Link className="btn-gray" href={'/dashboard/event-types/new'}>
            <Plus  size={18}/>
            New Event Type
            </Link>
        </div>
    )
}