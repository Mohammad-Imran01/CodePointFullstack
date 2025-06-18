import { useState, useEffect } from "react";

const AppLogo = ({ mainLogo = false }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check on load
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Tailwind's 'md' is 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <h1 className={`textTitle`}>{isSmallScreen && mainLogo ? "CP" : "Code Point"}</h1>;
};

export default AppLogo;
