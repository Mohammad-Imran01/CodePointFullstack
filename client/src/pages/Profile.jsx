import { useSelector } from "react-redux";

import UserProfile from "../components/profile/UserProfile";
const Profile = () => {
  const userData = useSelector((state) => state.auth?.userData);

  return (
    <div className="main-section ">
      <div className="mx-auto max-w-6xl">
        <UserProfile userData={userData} />
      </div>
    </div>
  );
};

export default Profile;
