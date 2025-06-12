import React from "react";
// import heroBG from "../assets/heroBG.svg";

const Hero = () => {
  return (
    <section className="flex items-center justify-center mt-[58px] grow text-wrap">
      <div className="flex items-center justify-center flex-col">
        <p className="text-8xl text-slate-900 dark:text-white font-semibold mb-4 text-center">
          Lead <span className="text-red-400">Career</span>
        </p>
        <p className="text-2xl leading-8 text-slate-900 dark:text-white text-center">
          Welcome to your own coding school! Learning is a journey, not a
          destination.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="btn-light flex items-center justify-center gap-1">
            Start here <span className="text-xl">⟶</span>
          </button>
          <button className="btn-dark">Testimonials</button>
        </div>
      </div>
      {/* <div className="flex-1 flex items-center justify-center">
        <img src={heroBG} alt="Hero Background" height={500} width={500} />
      </div> */}
    </section>
  );
};

export default Hero;
