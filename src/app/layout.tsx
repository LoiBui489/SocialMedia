import type { Metadata } from "next";
import "./globals.css";
import LeftBar from "@/components/left-bar";
import RightBar from "@/components/right-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import QueryProvider from "./provide/query-provider";

export const metadata: Metadata = {
    title: "My Social Media",
    description: "Clone From X",
};

export default function RootLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode,
    modal: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <QueryProvider>
                <html lang="en">
                    <body>
                        <div className="container flex justify-between max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto">
                            <SignedIn>
                                <div className="px-2 xsm:px-4 xxl:px-8" id="leftbar-container">
                                    <LeftBar />
                                </div>
                                <div className="flex-1 lg:min-w-[600px] border-x border-borderGray ml-32 xsm:ml-44 xxl:ml-72">
                                    {modal}
                                    {children}
                                </div>
                                <div className="hidden lg:flex flex-1 ml-4 xl:ml-8">
                                    <RightBar />
                                </div>
                            </SignedIn>
                            <SignedOut>
                                {children}
                            </SignedOut>
                        </div>
                    </body>
                </html>
            </QueryProvider>
        </ClerkProvider>
    );
}
