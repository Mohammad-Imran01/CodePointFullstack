import { useSelector } from "react-redux";

import MainSection from "../components/home/MainSection";
const Home = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <div className="main-section">
      {/* <h1>Main section</h1> */}
      <MainSection userData={userData} />
    </div>
  );
};

export default Home;
