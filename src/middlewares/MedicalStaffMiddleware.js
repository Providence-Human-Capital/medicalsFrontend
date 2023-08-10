import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MedicalStaffMiddleware = (Component) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  if (user.role !== "medical_staff") {
    // Redirect to unauthorized page or show an error message
    navigate("/unauthorized");
  }
  return <Component />;
};
export default MedicalStaffMiddleware;
