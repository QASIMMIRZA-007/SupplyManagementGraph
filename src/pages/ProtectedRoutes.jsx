import { useNavigate } from "react-router";
import { useUserAuth } from "../Context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  // console.log("Check user in Private: ", user);
  if (!user) {
    return navigate("/");
  }
  return children;
};

export default ProtectedRoute;
