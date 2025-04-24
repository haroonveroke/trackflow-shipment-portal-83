
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! We couldn't find the page you're looking for.</p>
        <p className="text-gray-500 mb-8">
          The page you requested might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button className="w-full">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
