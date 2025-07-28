import Image from "next/image";

export default function PostFeature() {
    return (
        <div className="cursor-pointer w-4 h-4">
            <Image src={"/icons/more.svg"} alt="more" width={16} height={16} />
        </div>
    );
};
