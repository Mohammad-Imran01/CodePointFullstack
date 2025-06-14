import { useState, useEffect } from "react";
import Tab from "../components/admin/Tab";
import Logs from "../components/admin/Logs";
import Settings from "../components/admin/Settings";
import ProductManager from "../components/admin/ProductManager";
import CommunityManagement from "../components/admin/CommunityManagement";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { BsPeople, BsWindowStack } from "react-icons/bs";
import { IoSettingsOutline, IoPrintOutline } from "react-icons/io5";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Products");
  const adminPanelError = useSelector((state) => state.admin?.adminPanelError);

  useEffect(() => {
    if (adminPanelError === "Unauthorized") {
      dispatch(logoutAction()).then(() => {
        navigate("/admin/signin");
      });
    }
  }, [adminPanelError, dispatch, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const tabItems = [
    {
      key: "Products",
      label: "Products",
      icon: IoPrintOutline,
    },
    {
      key: "Community Management",
      label: "Community Management",
      icon: BsPeople,
    },
    {
      key: "logs",
      label: "Logs",
      icon: BsWindowStack,
    },
    {
      key: "settings",
      label: "Settings",
      icon: IoSettingsOutline,
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between gap-3 overflow-clip bg-white/80 pb-5">
      <header className="flex w-full items-center justify-center border-b-2">
        <div className="flex w-[98%]  max-w-7xl items-center  justify-between py-3 shadow-purple-200/20 md:w-[95%] md:rounded-md">
          {/* <div className="flex w-full max-w-6xl items-center justify-between md:w-[95%]"> */}
          <h1 className="text-3xl font-bold text-stone-900">Admin Panel</h1>
          <Tab
            tabItems={tabItems}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
          {/* </div> */}
        </div>
      </header>

      <main className="h-[95%] w-[98%] max-w-7xl overflow-clip rounded-md md:w-[95%]">
        {/* <div className="rounded-xl bg-red-300 p-6 shadow-xl"> */}
        {activeTab === "Products" && <ProductManager />}
        {activeTab === "Community Management" && <CommunityManagement />}
        {activeTab === "logs" && <Logs />}
        {activeTab === "settings" && <Settings />}
        {/* </div> */}
      </main>
    </div>
  );
};

export default AdminPanel;
