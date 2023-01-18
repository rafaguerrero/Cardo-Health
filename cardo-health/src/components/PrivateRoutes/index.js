import { Navigate, Outlet } from "react-router-dom";
import { getToken } from '../../utils/token';

const PrivateRoutes = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
