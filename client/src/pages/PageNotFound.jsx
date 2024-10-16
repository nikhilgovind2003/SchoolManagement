import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageNotFound = () => {

  let nav;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-600 mt-2">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to={`/login`}
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
