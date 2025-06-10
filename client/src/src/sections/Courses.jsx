import React from "react";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  let courses = [
    {
      title: "Full-Stack Bootcamp",
      description:
        "Learn to build full-stack applications using React, Node.js, and MongoDB.",
      duration: "6 months",
      level: "Intermediate",
      price: "$999",
    },
    {
      title: "UX/UI Design Mastery",
      description:
        "Master the principles of UX/UI design and create stunning user interfaces.",
      duration: "4 months",
      level: "Beginner",
      price: "$799",
    },
    {
      title: "Data Science Pro",
      description: "Dive deep into data analysis, machine learning, and AI.",
      duration: "8 months",
      level: "Advanced",
      price: "$1299",
    },
    {
      title: "AI & ML Academy",
      description:
        "Explore the world of artificial intelligence and machine learning.",
      duration: "5 months",
      level: "Intermediate",
      price: "$1099",
    },
    {
      title: "Cloud & DevOps Path",
      description:
        "Learn cloud computing and DevOps practices for modern software development.",
      duration: "6 months",
      level: "Intermediate",
      price: "$999",
    },
    {
      title: "Startup Founder Kit",
      description:
        "Everything you need to know to launch your startup successfully.",
      duration: "3 months",
      level: "Beginner",
      price: "$599",
    },
  ];
  return (
    <section className="blueBg text-wrap w-full">
      <div className="insideCard">
        <h2 className="sectionHeading">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
