'use client';

import { socket } from "@/socket";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";

type NotificationData = {
    id: string,
    senderUsername: string,
    type: "like" | "repost" | "comment" | "follow",
    postType: "post" | "comment",
    link: string
};

function getActionMessage(notificationType: string, postType: string) {
    if (notificationType === "like") return `liked your ${postType === "post" ? "post" : "comment"}`;
    if (notificationType === "repost") return `reposted your ${postType === "post" ? "post" : "comment"}`;
    if (notificationType === "comment") return `commented on your ${postType === "post" ? "post" : "comment"}`;
}

export default function Notification() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const reset = () => {
        setNotifications([]);
    };

    const router = useRouter();
    const handleNotificationClick = (notification: NotificationData) => {
        const filterData = notifications.filter(item => item.id !== notification.id);
        setNotifications(filterData);
        router.push(notification.link);
    };

    useEffect(() => {
        socket.on("getNotification", (data: NotificationData) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, []);

    return (
        <div className="relative">
            <div className="p-2 rounded-full hover:bg-slate-800 flex items-center gap-4 cursor-pointer relative" onClick={() => setOpen(!open)}>
                <Image className="stroke-black" src={"/icons/notification.svg"} alt={"notification_icon"} width={24} height={24} />
                <span className="hidden xxl:inline">Notification</span>
                {
                    (notifications.length > 0 && !open) &&
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-iconBlue border-2 border-iconBlue rounded-full -top-2 -end-2">{notifications.length}</div>
                }
            </div>
            {
                open &&
                <div className="absolute flex flex-col bg-foreground text-background left-12 top-0 rounded-2xl px-4 py-2 gap-4 w-max z-10">
                    <div className="w-full flex justify-between gap-4">
                        <h1>Notifications</h1>
                        <button className="bg-foreground hover:bg-background text-background hover:text-foreground text-sm px-4 rounded-full" onClick={reset}>Mark all as read</button>
                    </div>
                    {
                        notifications.map((item) => (
                            <div className="cursor-pointer hover:bg-slate-300" key={item.id} onClick={() => handleNotificationClick(item)}>
                                <p>
                                    <b>{item.senderUsername}&nbsp;</b>
                                    {getActionMessage(item.type, item.postType)}
                                </p>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};
