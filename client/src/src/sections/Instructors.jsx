import React from "react";

const Instructors = () => {
  let instructors = [
    {
      name: "John Doe",
      expertise: "Full-Stack Development",
      experience: "10 years",
      coursesTaught: 20,
    },
    {
      name: "Jane Smith",
      expertise: "UX/UI Design",
      experience: "8 years",
      coursesTaught: 15,
    },
    {
      name: "Alice Johnson",
      expertise: "Data Science",
      experience: "5 years",
      coursesTaught: 10,
    },
  ];
  return (
    <section className="blueBg text-wrap w-full">
      <div className="insideCard">
        <h2 className="sectionHeading">Meet Your Instructors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-400 bg-white/30 dark:bg-slate-700/30 text-stone-800 dark:text-stone-100 shadow-sm/30 p-6"
            >
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                {instructor.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Expertise: {instructor.expertise}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Experience: {instructor.experience}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Courses Taught: {instructor.coursesTaught}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
