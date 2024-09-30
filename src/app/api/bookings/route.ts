import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profiles";
import mongoose from "mongoose";
import { NextRequest } from "next/server";


type JsonData = {
    guestName: string;
    guestEmail: string;
    guestNotes: string;
    username: string;
    bookingUri: string;
    bookingTime: string;
}

export async function POST(req: NextRequest) {
    const { guestName, guestEmail, guestNotes, username, bookingUri, bookingTime }: JsonData = await req.json();
    const profileDoc = await ProfileModel.findOne({
        username: username,
    })
    if (!profileDoc) {
        return Response.json('No username found', {
            status: 404,
        })
    }
    const eventTypeDoc = await EventTypeModel.findOne({
        email: profileDoc.email,
        uri: bookingUri,
    })
    if (!eventTypeDoc) {
        return Response.json('Invalid URL!', {
            status: 400,
        })
    }
    mongoose.connect(process.env.MONGODB_URI as string);
    BookingModel.create({
        guestName,
        guestEmail,
        guestNotes,
        when: bookingTime,
        eventTypeId: eventTypeDoc._id,
    })
    return Response.json(true, {
        status: 201,
    })
}