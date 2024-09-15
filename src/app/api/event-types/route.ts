import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

function uriFromTitle(title: string):string {
    return title.toLowerCase().replace(/[^a-z0-9]/g,'-');
}

export async function POST(req: NextRequest, res: NextRequest) {
    // @ts-expect-error : this is a comment to ignore the error
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const email = await session().get('email');
    data.uri = uriFromTitle(data.title);
    if (!email) {
        return new Response('Unauthorized', { status: 401 });
    }
    const eventTypeDoc = await EventTypeModel.create({ email, ...data });
    return Response.json(eventTypeDoc);
}

export async function PUT(req: NextRequest) {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const data = await req.json();
    data.uri = uriFromTitle(data.title);
    const email = await session().get('email');
    const id = data.id;
    if (email && id) {
        const eventTypeDoc = await EventTypeModel.updateOne(
            { email, _id: id },
            data,
        );
        revalidatePath('/dashboard/event-types');
        return Response.json(eventTypeDoc);
    }
    return Response.json(false);
}


export async function DELETE(req: NextRequest) {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await EventTypeModel.deleteOne({ _id: id });
    return Response.json(true);
}