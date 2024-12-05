/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { currentUserToken, logout } from "../redux/features/auth/authSlice";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector(currentUserToken);
  let user;
  if (token) {
    user = jwtDecode(token);
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== undefined && role !== user?.role) {
    toast.error("You are not permitted. Only higher authority can access.");
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;