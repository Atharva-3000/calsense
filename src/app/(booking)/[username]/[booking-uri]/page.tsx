import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profiles";
import mongoose from "mongoose";
import background from "/background.jpg";
import { Clock, Info } from "lucide-react";
import TimePicker from "@/app/components/TimePicker";
type PageProps = {
    params: {
        username: string; "booking-uri": string;
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
        <div>
            <div className="flex items-center h-screen bg-cover" style={{ backgroundImage: "url(/background.jpg)" }}>
                <div className="w-full text-center">
                    <div className="inline-flex  mx-auto shadow-md rounded-lg overflow-hidden">
                        <div className="bg-blue-100/50 p-8 w-80 text-gray-800">
                            <h1 className="text-2xl font-bold mb-4 border-b border-black/10 pb-2 text-left">
                                {eDoc.title}
                            </h1>
                            <div
                                className="grid gap-y-4 grid-cols-[40px_1fr] text-left">
                                <div>
                                    <Clock size={18} />
                                </div>
                                <div>
                                    {eDoc.length}mins
                                </div>
                                <div>
                                    <Info size={18} />
                                </div>
                                <div>
                                    {eDoc.description}
                                </div>
                            </div>
                            <div />
                        </div>
                        <div
                            className="bg-white/80 grow">
                            <TimePicker
                                bookingTimes=
                                {JSON.parse(JSON.stringify(eDoc.bookingTimes))}
                                length={eDoc.length} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}