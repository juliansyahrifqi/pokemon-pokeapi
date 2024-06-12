import { Link, useRouteError } from "react-router-dom";

interface ErrorRouter {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorRouter;

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen">
      <img src="/pokeball.png" alt="Pokeball" className="w-32 animate-pulse"/>
      <p className="text-7xl lg:text-9xl font-bold mt-4">{error.status}</p>
      <p className="text-3xl md:text-4xl font-bold mb-4">{error.statusText || error.message}</p>
      <Link to="/">
        <p className="text-blue-700 underline underline-offset-4">Back to Home</p>
      </Link>
    </div>
  );
}
