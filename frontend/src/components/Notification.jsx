import { useEffect, useState } from "react";
import ModalNotification from "./ModalNotification";

export default function Notification() {
    const [alerts, setAlerts] = useState([]);
    const [isModalNotifOpen, setIsModalNotifOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("http://localhost:3001/alerts");
                const data = await res.json();

                if (data.length > 0) {
                    setAlerts(data);
                    setIsModalNotifOpen(true);
                }
            } catch (err) {
                console.error("Error fetching alerts:", err);
            }
        }, 10000); // runs every 10 secs

        return () => clearInterval(interval);
    }, []);

    return (
        <ModalNotification
            open={isModalNotifOpen}
            title="Long Signal Alert"
            alerts={alerts}
            buttonLabel="Close"
            onClose={() => setIsModalNotifOpen(false)}
        />
    );
}