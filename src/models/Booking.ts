import mongoose from "mongoose";

interface IBooking extends mongoose.Document {
    guestName: string;
    guestEmail: string;
    guestNotes: string;
    when: Date;
    eventTypeId: string;
}

const BookingSchema = new mongoose.Schema<IBooking>({
    guestName: String,
    guestEmail: String,
    guestNotes: String,
    when: Date,
    eventTypeId: String,
})


export const BookingModel = mongoose.models?.Booking as mongoose.Model<IBooking> || mongoose.model<IBooking>('Booking', BookingSchema);