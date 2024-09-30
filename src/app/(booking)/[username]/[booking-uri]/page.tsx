import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profiles";
import mongoose from "mongoose";
import background from "/background.jpg";
import { Clock, Info } from "lucide-react";
import TimePicker from "@/app/components/TimePicker";
type PageProps = {
    params: {
        username: string; 
        "booking-uri": string;
    },
}

export default async function BookingPage(props: PageProps) {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({
        username: props.params.username,
    })
    if (!profileDoc) {
        return '404'
    }
    const eDoc = await EventTypeModel.findOne({
        email: profileDoc.email,
        uri: props.params?.["booking-uri"],
    });
    if (!eDoc) {
        return '404'
    }
    return (
        <TimePicker
        username={props.params.username}
        meetingUri={eDoc.uri}
        bookingTimes=
        {JSON.parse(JSON.stringify(eDoc.bookingTimes))}
        length={eDoc.length} />
    )
}