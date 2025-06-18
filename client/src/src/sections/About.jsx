import React from "react";
import AppLogo from "../../components/shared/AppLogo";

const About = () => {
  return (
    // <section className="blueBg">
    <section className="blueBg text-wrap w-full">
      <div className="insideCard">
        <h2 className="sectionHeading">About Us</h2>
        <p className="dark:text-white block text-center text-lg leading-relaxed text-slate-900 md:text-xl">
          Welcome to{" "}
          <span className="font-bold text-stone-800">Code Point </span>
          — your go-to platform for practical, project-driven learning. Whether
          you're just starting out or upskilling in areas like programming,
          design, or data science, we offer carefully crafted content that
          focuses on building real-world skills.
          <br />
          <br />
          Our mission is to make learning accessible, engaging, and hands-on.
          With expert mentors, guided tutorials, and a growing community,
          LearnSpace empowers you to learn by doing.
        </p>
      </div>
    </section>
  );
};

export default About;
