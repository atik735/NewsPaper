import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Register/SignUp";
import Login from "../Pages/Login/Login";
import AllArticles from "../Pages/All Articles/AllArticles";
import AddArticles from "../Pages/AddArticles/AddArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import Dashboard from "../components/Dashboard/Dashboard";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import PrivateRoute from "./PrivateRoute";
import ArticleDetails from "../Pages/ArticlesDetails/ArticlesDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allArticles",
        Component: AllArticles,
      },
      {
        path: "articles/:id",
        element:(
    <PrivateRoute>
      <ArticleDetails />
    </PrivateRoute>
        )
      },
      {
        path: "addArticles",
        Component: AddArticles,
      },
      {
        path: "myArticles",
        Component: MyArticles,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "premium",
        Component: PremiumArticles,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
