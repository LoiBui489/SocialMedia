import Image from "next/image";
import OptimizedImage from "./image";
import Link from "next/link";

export default function PopularTag() {
    return (
        <div className="flex flex-col gap-2 p-2 border border-borderGray rounded-2xl">
            <h1 className="text-xl font-bold text-textGrayLight">What&apos;s Happening</h1>
            {/* Trend */}
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <OptimizedImage path={"social-media/general/post.jpg"} alt="trend-media" width={120} height={120} />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-textGrayLight">Trending ...</h2>
                    <span className="text-sm text-textGray">Lorem ipsum ...</span>
                </div>
            </div>
            {/* Topic */}
            <div>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-textGray text-sm">Technoligy . Trending</span>
                    <Image src={"/icons/infoMore.svg"} alt="info" width={24} height={24}
                            className="hover:bg-slate-700 cursor-pointer rounded-full p-1" />
                </div>
                <div>
                    <h2 className="text-textGrayLight font-bold">Open AI</h2>
                    <span className="text-textGray text-sm">26K Posts</span>
                </div>
                <div>
                    <h2 className="text-textGrayLight font-bold">Open AI</h2>
                    <span className="text-textGray text-sm">26K Posts</span>
                </div>
                <div>
                    <h2 className="text-textGrayLight font-bold">Open AI</h2>
                    <span className="text-textGray text-sm">26K Posts</span>
                </div>
            </div>
            <Link href="/" className="text-iconBlue text-sm">Show more</Link>
        </div>
    );
};
