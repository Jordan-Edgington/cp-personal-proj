// router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import SignupPage from './pages/SignupPage';

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
      }
    ],
  },
]);

export default router;