import React from "react";

// {
//   learner: "🎉 I landed a job at Google!",
//   countries: "🌎 From India, now working in California",
//   rate: "📈 The Data Science track was life-changing",
//   courses: "🧠 The instructors were incredibly clear and supportive",
//   rating: "⭐️⭐️⭐️⭐️⭐️ Couldn't have done it without this platform!",
// },

const StoryCard = ({ learner, countries, rate, courses, rating }) => {
  // return <div>{learner + countries + rate + courses + rating}</div>;
  return (
    <div className="shrink-0 flexCenter h-44 min-w-md p-4 rounded-lg border border-slate-400 bg-white/30 dark:bg-slate-700/30 text-stone-800 dark:text-stone-100 shadow-sm/30">
      <ul className="flex-col">
        <li>{learner}</li>
        <li>{countries}</li>
        <li>{rate}</li>
        <li>{courses}</li>
        <li>{rating}</li>
      </ul>
    </div>
  );
};

export default StoryCard;
