import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextRequest) {
    // @ts-expect-error : this is a comment to ignore the error
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const email = await session().get('email');
    if(!email) {
        return new Response('Unauthorized', { status: 401 });
    }
    const eventTypeDoc = await EventTypeModel.create({ email, ...data });
    return Response.json(eventTypeDoc);
}