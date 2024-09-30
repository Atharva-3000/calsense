'use client';
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";

type PageProps = {
    params: {
        username: string;
        "booking-uri": string;
        "booking-time": string;
    }
}

export default function BookingFormPage(props: PageProps) {

    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestNotes, setGuestNotes] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const username = props.params.username;
    const bookingUri = props.params["booking-uri"];
    const bookingTime = new Date(decodeURIComponent(props.params["booking-time"]));

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(guestName, guestEmail, guestNotes);
        const data = { guestName, guestEmail, guestNotes, username, bookingUri, bookingTime };
        await axios.post('/api/bookings',
            data
        );
        setConfirmed(true);
    }
    return (
        <div className="text-left p-8 w-[400px]">
            <h2 className="text-2xl font-bold mb-4 border-b border-black/10 pb-2 text-gray-500">
                {format(bookingTime, 'EEEE, MMMM d, HH:mm')}
            </h2>
            {
                confirmed && (
                    <div>
                        Thanks for confirming your booking!
                    </div>
                )
            }
            {!confirmed && (
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Your Full Name*</span>
                        <input type="text" name="name" placeholder="John Doe" required
                            value={guestName} onChange={(e) => setGuestName(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Your Email*</span>
                        <input type="email" name="email" placeholder="johndoe@gmail.com" required
                            value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Additional Info (optional)</span>
                        <textarea placeholder="Any relevant info..."
                            value={guestNotes} onChange={(e) => setGuestNotes(e.target.value)}
                        />
                    </label>
                    <div className="text-right">
                        <button className="btn-blue" type="submit">
                            Confirm
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}