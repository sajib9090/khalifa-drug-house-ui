import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const AppLayout = () => {
  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-0 left-0 z-[999]">
        <Header />
      </div>

      <div className="lg:flex">
        {/* Sticky Navbar on large screens */}
        <div>
          <Navbar />
          <div className="hidden lg:block fixed bottom-0">
            <Footer />
          </div>
        </div>

        {/* Main Content - not sticky */}
        <div className="w-full">
          <Outlet />
        </div>

        {/* Footer for small screens */}
        <div className="lg:hidden block">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
