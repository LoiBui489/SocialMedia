'use client';

import Image from "next/image";
import OptimizedImage from "../image";
import { useActionState, useEffect, useRef, useState } from "react";
import { addPost } from "@/action/share-action";
import ImageEditor from "../image-editor";
import { Setting } from "./types";
import { useUser } from "@clerk/nextjs";

export default function Share() {
    const { user } = useUser();
    const [media, setMedia] = useState<File | null>(null);
    const previewUrl = media ? URL.createObjectURL(media) : null;
    const fileInput = useRef<HTMLInputElement>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [setting, setSetting] = useState<Setting>({
        shape: "original",
        isSensitive: false
    });
    const [state, formAction, isPending] = useActionState(addPost, { success: false, error: false });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMedia(file);
        }
    };

    const deleteFile = () => {
        if (fileInput.current) {
            fileInput.current.value = "";
        }
        setMedia(null);
        setSetting({ shape: "original", isSensitive: false })
    }

    useEffect(() => {
        if (state.success) {
            deleteFile();
        }
    }, [state]);

    return (
        <form action={formAction}
                // action={(formdata) => { shareAction(formdata, setting), deleteFile() }} 
                className="flex gap-4 p-4 pb-2">
            {/* Author */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <OptimizedImage src={user?.imageUrl} alt="avatar" width={40} height={40} />
            </div>
            {/* Content editor */}
            <div className="flex-1">
                <input type="hidden" name="shape" value={setting.shape} readOnly />
                <input type="hidden" name="isSensitive" value={setting.isSensitive ? "true" : "false"} readOnly />
                <input type="text"
                    placeholder="What's happening?" name="description"
                    className="max-h-[250px] resize-none w-full outline-none bg-transparent text-textGrayLight placeholder:text-textGray mb-2 pb-4 border-b border-borderGray" />
                {
                    previewUrl && (
                        media?.type.startsWith("image") ?
                            <div className="rounded-xl overflow-hidden mb-2 relative">
                                <div className="absolute top-2 right-2 bg-black/50 text-foreground text-sm font-bold rounded-full py-[0.125rem] px-2 cursor-pointer" onClick={deleteFile}>x</div>
                                <div className="absolute top-2 left-2 bg-black/50 text-foreground text-sm font-bold rounded-full py-1 px-4 cursor-pointer" onClick={() => setIsEditorOpen(true)}>Edit</div>
                                <Image src={previewUrl} alt="uploaded-image" width={600} height={400}
                                    className={`w-full ${setting.shape === "original" ? "h-full object-contain" : setting.shape === "square" ? "aspect-square object-cover" : "aspect-video object-cover"}`} />
                            </div> :
                            <div className="rounded-xl overflow-hidden mb-2 relative">
                                <div className="absolute top-2 right-2 z-10 bg-black/50 text-foreground text-sm font-bold rounded-full py-[0.125rem] px-2 cursor-pointer" onClick={deleteFile}>x</div>
                                <video src={previewUrl} className="" controls />
                            </div>

                    )
                }
                {
                    isEditorOpen && previewUrl && <ImageEditor setting={setting} setSetting={setSetting} previewURL={previewUrl} onClose={() => setIsEditorOpen(false)} />
                }
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <input type="file" accept="image/*,video/*" ref={fileInput} onChange={handleFileChange} className="hidden" id="inputMedia" name="media" />
                        <label htmlFor="inputMedia">
                            <Image className="p-1 cursor-pointer hover:bg-textGray rounded-full"
                                src={"/icons/image.svg"} alt="media" width={30} height={30} />
                        </label>
                        <Image className="p-1 cursor-pointer hover:bg-textGray rounded-full"
                            src={"/icons/gif.svg"} alt="media" width={30} height={30} />
                        <Image className="p-1 cursor-pointer hover:bg-textGray rounded-full"
                            src={"/icons/poll.svg"} alt="media" width={30} height={30} />
                        <Image className="p-1 cursor-pointer hover:bg-textGray rounded-full"
                            src={"/icons/emoji.svg"} alt="media" width={30} height={30} />
                        <Image className="p-1 cursor-pointer hover:bg-textGray rounded-full"
                            src={"/icons/schedule.svg"} alt="media" width={30} height={30} />
                        <Image className="p-1 cursor-pointer hover:bg-textGray rounded-full"
                            src={"/icons/location.svg"} alt="media" width={30} height={30} />
                    </div>
                    <button type="submit"
                        className="bg-foreground hover:bg-slate-300 text-background rounded-full py-2 px-4 text-center font-bold disabled:cursor-not-allowed disabled:bg-slate-600" 
                        disabled={isPending} >
                        { isPending ? "Sharing" : "Share" }
                    </button>
                </div>
                { state.error && <span className="text-iconRed p-4">Something went wrong! Please try again</span> }
            </div>
        </form>
    );
};
