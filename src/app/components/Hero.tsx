"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
    const [showLine, setShowLine] = useState(false);
    useEffect(() => {
        setShowLine(true);
    })
    return (
        <section className="text-center mt-24">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
                Scheduling made Simple,<br />
                for {" "}
                <span className={"text-blue-600 cool-underline " + (showLine ? 'show-underline' : '')}>
                    Everyone
                </span>.
            </h1>
            <p className="text-gray-600 font-medium">
                Effortlessly Schedule, Connect Seamlessly – Your Time, Your Rules.
                <br />Plus we are open source! <a href="https://github.com/Atharva-3000/calsense" className="underline text-blue-500 font-bold">Here's </a> the code.🚀
            </p>
            <div className="mt-4 flex gap-4 justify-center">
                <Link href={"/"} className="bg-black text-white py-2 px-4 rounded-full">
                    Get started for Free
                </Link>
                <Link href={"/"} className="border rounded-full py-2 px-4 inline-flex gap-1 items-center border-gray-300">
                    <Play size={18} />
                    Watch Video
                </Link>
            </div>
        </section>
    )
}