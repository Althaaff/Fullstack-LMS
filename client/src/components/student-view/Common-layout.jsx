import FooterComponent from "@/components/Footer";
import StudentViewCommonHeader from "@/components/student-view/Header";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StudentViewCommonLayout = () => {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("/course-progress") ? (
        <StudentViewCommonHeader />
      ) : null}
      <Outlet />

      {!location.pathname.includes("/course-progress") ? (
        <FooterComponent />
      ) : null}
    </div>
  );
};

export default StudentViewCommonLayout;
