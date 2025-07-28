'use client';

import Share from "@/components/share/share";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function ShareModal() {
    const router = useRouter();
    const modal = useRef<HTMLDivElement>(null);
    const overlay = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        router.back();
    };

    const overlayClick = (e: React.MouseEvent) => {
        if (!modal.current?.contains(e.target as Node)) {
            closeModal();
        }
    };

    return (
        <div ref={overlay} onClick={overlayClick}
            className="fixed top-0 left-0 z-20 w-screen h-screen overflow-scroll bg-[#293139a6] flex justify-center select-none">
            <div ref={modal} className="py-4 px-8 bg-background rounded-lg w-[600px] h-max mt-12">
                <div className="flex justify-between items-center">
                    <div className="cursor-pointer" onClick={closeModal}>X</div>
                    <div className="cursor-pointer text-iconBlue font-bold">Drafts</div>
                </div>
                <Share />
            </div>
        </div>
    );
};
