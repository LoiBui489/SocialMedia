
import Feed from "@/components/feed/feed";
import FeedOption from "@/components/feed/feed-option";
import Share from "@/components/share/share";

export default function Home() {
    return (
        <>
            <FeedOption />
            <Share />
            <Feed />
        </>
    );
}
