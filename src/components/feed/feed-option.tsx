'use client';

import Link from "next/link";

export default function FeedOption() {
    return (
        <div className="flex justify-evenly gap-4 font-bold pt-4 border-b border-borderGray">
            <Link className="pb-2 border-b-4 border-iconBlue" href={"/"}>For you</Link>
            <Link className="pb-2 active:border-b-4 active:border-iconBlue" href={"/"}>Following</Link>
        </div>
    );
};
