import Image from "next/image";
import Link from "next/link";
import OptimizedImage from "./image";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma";
import Socket from "./socket";
import Notification from "./notification";
import { Fragment } from "react";

const menuList = [
    { id: 1, name: "Home", link: "/", icon: "home.svg" },
    { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
    { id: 4, name: "Message", link: "/", icon: "message.svg" },
    { id: 5, name: "Bookmark", link: "/", icon: "bookmark.svg" },
    { id: 6, name: "Job", link: "/", icon: "job.svg" },
    { id: 7, name: "Community", link: "/", icon: "community.svg" },
    { id: 8, name: "Premium", link: "/", icon: "logo.svg" },
    { id: 9, name: "Profile", link: "/LoiBui", icon: "profile.svg" },
    { id: 10, name: "More", link: "/", icon: "more.svg" },
];

export default async function LeftBar() {
    const { userId } = await auth();
    if (!userId) return;
    const user = await prisma.user.findFirst({
        where: { id: userId }
    });
    if (!user) return;

    return (
        <div className="h-screen fixed top-0 flex flex-col justify-between pt-2 pb-8 z-10">
            {/* Menu */}
            <div className="flex flex-col gap-4 items-center xxl:items-start">
                <Link className="p-2 rounded-full hover:bg-slate-800" href={"/"}>
                    <Image src={"/icons/logo.svg"} alt="logo" width={24} height={24} />
                </Link>
                <div className="flex flex-col gap-2">
                    {
                        menuList.map((item, index) => (
                            <Fragment key={item.id}>
                                {index === 2 && <div className="select-none"><Notification /></div>}
                                <Link className="p-2 rounded-full hover:bg-slate-800 flex items-center gap-4 select-none" href={item.link}>
                                    <Image className="stroke-black" src={`/icons/${item.icon}`} alt={`${item.name}_icon`} width={24} height={24} />
                                    <span className="hidden xxl:inline">{item.name}</span>
                                </Link>
                            </Fragment>
                        ))
                    }
                </div>
                <Link href={"/compose/share"}
                    className="xxl:hidden bg-foreground hover:bg-slate-300 rounded-full w-12 h-12 flex justify-center items-center" >
                    <Image src={"/icons/post.svg"} alt="post_icon" width={24} height={24} />
                </Link>
                <Link className="hidden xxl:block w-full bg-foreground hover:bg-slate-300 text-background rounded-full py-2 text-center font-bold"
                    href={"/compose/share"}>Post</Link>
                <Socket username={user.username} />
            </div>
            {/* User */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 mx-auto">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        {
                            user.avatar ?
                                <OptimizedImage path={user.avatar} alt="avatar" width={40} height={40} /> :
                                <Image src={"/general/no-avatar.png"} alt="avatar" width={40} height={40} />
                        }
                    </div>
                    <div className="hidden xxl:flex flex-col">
                        <span className="font-bold">{user.displayName}</span>
                        <span className="text-sm text-textGray">{user.email}</span>
                    </div>
                    <span className="font-bold xxl:hidden">{user.displayName}</span>
                </div>
                <div className="hidden xxl:block cursor-pointer font-bold hover:bg-slate-800 rounded-full w-6 h-6 text-center content-center">...</div>
            </div>
        </div>
    );
};