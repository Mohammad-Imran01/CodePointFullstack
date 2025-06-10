import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full h-full text-3xl flex justify-center items-center">
      <h1>PageNotFound</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
