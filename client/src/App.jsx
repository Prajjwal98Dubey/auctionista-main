import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import BottomSheet from "./components/BottomSheet";
import useUserDetails from "./custom-hooks/useUserDetails";

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Auction = lazy(() => import("./pages/Auction"));

function App() {
  useUserDetails();
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;

const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center py-2 font-bold font-kanit text-3xl">
        Loading...
      </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loader />}>
        <Auth />
      </Suspense>
    ),
  },
  {
    path: "/u",
    element: (
      <Suspense fallback={<Loader />}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <BottomSheet />
      </Suspense>
    ),
  },
  {
    path: "/auction/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <Auction />
      </Suspense>
    ),
  },
]);
