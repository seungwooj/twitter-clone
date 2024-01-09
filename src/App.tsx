import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./routes/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<Layout />} />,
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

const GlobalStyles = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}
body {
  background-color: black;
  color: white;
  font-family: "Open Sans", sans-serif;
}
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
