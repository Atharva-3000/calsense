import DashboardNav from "@/app/components/DashboardNav";
import EventTypeForm from "@/app/components/EventTypeForm";

export default function NewEventType() {
    return (
        <div>
            <DashboardNav />
            <div className="mt-4"> 
            </div>
            <EventTypeForm/>
        </div>
    )
}