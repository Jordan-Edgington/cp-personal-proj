// router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import SignupPage from './pages/SignupPage';
import UserFeedPage from "./pages/UserFeedPage";
import MealTrackerPage from "./pages/MealTracker";
import MealMakerPage from "./pages/MealMakerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // If user is logged in, this should redirect to user's feed.
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'signup/',
        element: <SignupPage />
      },
      {
      path: 'feed/',
      element: <UserFeedPage />
      },
      {
        path: 'meals/',
        element: <MealTrackerPage />
      },
      {
        path: 'mealmaker/',
        element: <MealMakerPage />
      },
      {
        path: 'test/',
        element: <testPage />
      },
    ],
  },
]);

export default router;