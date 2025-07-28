'use client';

import { IKVideo } from "imagekitio-next";

export default function Video({ path, className }: { path: string, className: string }) {
    const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT

    return (
        <div>
            <IKVideo urlEndpoint={urlEndpoint} path={path} controls
                        className={className} 
                        // transformation={[{ width: "1920", height: "1080" }]}
                        preload="none"
                        poster="https://i.ytimg.com/vi/emkBgxMrAsU/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWShRMA8=&rs=AOn4CLDT_eNBsHBBEsCTVM8ztiSnVEDCWw"
                        />
        </div>
    );
};
