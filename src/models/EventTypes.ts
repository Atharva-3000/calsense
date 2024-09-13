import { model, models, Schema } from "mongoose";

type FromTo = {
    from: string;
    to: string;
};

const FromToSchema = new Schema<FromTo>({
    from: String,
    to: String,
})

type EventType = {
    email: string;
    title: string;
    description: string;
    length: number;
    bookingTimes: Record<Weekday, FromTo>;
};

const EventTypeSchema = new Schema<EventType>({
    email: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: new Schema({
        monday: FromToSchema,
        tuesday: FromToSchema,
        wednesday: FromToSchema,
        thursday: FromToSchema,
        friday: FromToSchema,
        saturday: FromToSchema,
        sunday: FromToSchema,
    }),
}, {
    timestamps: true
});

export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export const EventTypeModel =models?.EventType ||  model<EventType>("EventType", EventTypeSchema);