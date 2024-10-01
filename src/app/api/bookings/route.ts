import { nylas } from "@/libs/nylas";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profiles";
import { addMinutes } from "date-fns";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { WhenType } from "nylas";


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
  });


  const grantId = profileDoc.grantId;
  const startDate = new Date(bookingTime);
  await nylas.events.create({
    identifier: grantId,
    requestBody: {
      title: eventTypeDoc.title,
      description: eventTypeDoc.description,
      when: {
        startTime: Math.round(startDate.getTime() / 1000),
        endTime: Math.round(addMinutes(startDate, eventTypeDoc.length).getTime() / 1000),
      },

      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: guestName,
          email: guestEmail,
          status: "yes"
        },
      ]
    },
    queryParams: {
      calendarId: eventTypeDoc.email,
    },
  })

  return Response.json(true, {
    status: 201,
  })
}