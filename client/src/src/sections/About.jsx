import React from "react";

const About = () => {
  return (
    // <section className="blueBg">
    <section className="blueBg text-wrap w-full">
      <div className="insideCard">
        <h2 className="sectionHeading">About Us</h2>
        <p className="text-lg md:text-xl text-center leading-relaxed block text-slate-900 dark:text-white">
          Welcome to{" "}
          <a
            className="font-semibold text-slate-900 dark:text-white hover:underline duration-100"
            href="#"
          >
            Code Point
          </a>{" "}
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
