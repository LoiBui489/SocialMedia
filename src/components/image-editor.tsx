import Image from "next/image";
import React, { useRef } from "react";
import { Setting } from "./share/types";

export default function ImageEditor({
    setting, setSetting, previewURL, onClose
}: {
    setting: Setting,
    setSetting: React.Dispatch<React.SetStateAction<Setting>>,
    previewURL: string,
    onClose: () => void
}) {
    const editor = useRef<HTMLDivElement>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const [newSetting, setNewSetting] = React.useState<Setting>(setting);

    const overlayClick = (e: React.MouseEvent) => {
        if (!editor.current?.contains(e.target as Node)) {
            onClose();
        }
    };

    const toggleSensitive = (isSensitive: Setting["isSensitive"]) => {
        setNewSetting((prev) => ({ ...prev, isSensitive }))
    };

    const handleImageShape = (shape: Setting["shape"]) => {
        setNewSetting((prev) => ({ ...prev, shape }))
    }

    const saveSetting = () => {
        setSetting(newSetting);
    }

    return (
        <div ref={overlay} className="fixed top-0 left-0 z-30 w-screen h-screen bg-black/75 flex justify-center items-center select-none"
            onClick={overlayClick}>
            <div ref={editor} className="bg-black rounded-xl p-12 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            className="cursor-pointer"
                            onClick={onClose}>
                            <path fill="white" d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                        </svg>
                        <h1 className="font-semibold text-xl">Media Editing</h1>
                    </div>
                    <button type="button" className="py-2 px-4 rounded-full bg-foreground text-background font-semibold" onClick={() => {
                        saveSetting();
                        onClose();
                    }}>Save</button>
                </div>
                <div className="w-[600px] h-[600px] content-center">
                    <Image src={previewURL} alt="image" width={600} height={600}
                        className={`w-full ${newSetting.shape === "original" ? "h-full object-contain" : newSetting.shape === "square" ? "aspect-square object-cover" : "aspect-video object-cover"}`} />
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-8">
                        <div className={`flex items-center gap-2 cursor-pointer ${newSetting.shape === "original" ? "text-iconBlue" : "text-textGray"}`}  onClick={() => handleImageShape("original")}>
                            <svg width={24} height={24} viewBox="0 0 24 24" className="cursor-pointer">
                                <path className={newSetting.shape === "original" ? "fill-iconBlue" : "fill-textGray"}
                                        d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z" />
                            </svg>
                            Original
                        </div>
                        <div className={`flex items-center gap-2 cursor-pointer ${newSetting.shape === "wide" ? "text-iconBlue" : "text-textGray"}`}  onClick={() => handleImageShape("wide")}>
                            <svg width={24} height={24} viewBox="0 0 24 24" className="cursor-pointer">
                                <path className={newSetting.shape === "wide" ? "fill-iconBlue" : "fill-textGray"} 
                                        d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z" />
                            </svg>
                            Wide
                        </div>
                        <div className={`flex items-center gap-2 cursor-pointer ${newSetting.shape === "square" ? "text-iconBlue" : "text-textGray"}`} onClick={() => handleImageShape("square")}>
                            <svg width={24} height={24} viewBox="0 0 24 24" className="cursor-pointer">
                                <path className={newSetting.shape === "square" ? "fill-iconBlue" : "fill-textGray"}
                                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z" />
                            </svg>
                            Square
                        </div>
                    </div>
                    <div className={`py-1 px-4 rounded-full flex items-center gap-1 cursor-pointer ${newSetting.isSensitive ? "bg-iconRed text-foreground" : "text-background bg-foreground"}`}
                        onClick={() => toggleSensitive(!newSetting.isSensitive)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none"
                            className={`${newSetting.isSensitive ? "stroke-foreground" : "stroke-background"}`}>
                            <path d="M4 12.6111L8.92308 17.5L20 6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1>Sensitive</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
