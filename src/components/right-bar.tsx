import Link from "next/link";
import PopularTag from "./popular-tag";
import Recommendation from "./recommendation";
import Search from "./search";

export default function RightBar() {
    return (
        <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max">
            <Search />
            <PopularTag />
            <Recommendation />
            <div className="text-textGray text-sm flex flex-wrap gap-x-4">
                <Link href="/">Terms of Service</Link>
                <Link href="/">Privacy Policy</Link>
                <Link href="/">Cookies Policy</Link>
                <Link href="/">Accessibility</Link>
                <Link href="/">Ads Info</Link>
                <span>&copy; 2025 LB</span>
            </div>
        </div>
    );
};
