import { Route, Routes } from "react-router";
import "./App.scss";

import AuthForm from "./Components/UI/Authform/AuthForm";
import MainLayout from "./Components/MainLayout";
import NotFoundPage from "./pages/NoFoundPage/NotFoundPage";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Home from "./Components/UI/Home/Home";
import { UserAuthContextProvider } from "./Context/UserAuthContext";


function App() {
  return (
    <>
    <UserAuthContextProvider> 
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/userinterface"
          element={
            <ProtectedRoute>
            <MainLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <NotFoundPage /> */}
      </UserAuthContextProvider>
    </>
  );
}

export default App;
