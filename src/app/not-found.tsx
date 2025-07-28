// Render when the navigated route is not found
// Auto wrap the page with the ErrorBoundary component
export default function NotFound() {
    return ( 
        <div className="h-screen text-center content-center">
            <p className="font-bold text-2xl pb-4">404 Not Found</p>
            <p className="text-textGray">Page not Found</p>
        </div>
    );
};