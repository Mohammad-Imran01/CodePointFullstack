import React from "react";
import StoryCard from "../components/StoryCard";

const successList = [
  {
    learner: "🎉 I landed a job at Google!",
    countries: "🌎 From India, now working in California",
    rate: "📈 The Data Science track was life-changing",
    courses: "🧠 The instructors were incredibly clear and supportive",
    rating: "⭐️⭐️⭐️⭐️⭐️ Couldn't have done it without this platform!",
  },
  {
    learner: "🚀 Switched careers from marketing to full-stack dev",
    countries: "🇬🇧 Based in London, now working remotely for a US startup",
    rate: "📚 The projects helped build a solid portfolio",
    courses: "👨‍🏫 Live doubt sessions were a game changer",
    rating: "✨ 5/5 — Highly recommend to anyone pivoting careers",
  },
  {
    learner: "👩‍🎓 Got my first tech job at Microsoft!",
    countries: "🇨🇦 Learnt everything from scratch through this course",
    rate: "📈 6 months of consistent learning paid off",
    courses: "💻 The JavaScript course was my favorite",
    rating: "🌟 The platform feels like a mentor",
  },
  {
    learner: "💼 Promoted to Senior Developer!",
    countries: "🇦🇺 Working in Sydney at a fintech company",
    rate: "🔥 Upskilled through the backend engineering path",
    courses: "🛠️ Real-world projects and clear roadmap",
    rating: "💯 Truly worth the investment",
  },
  {
    learner: "🎓 Cleared AWS Certification on first attempt!",
    countries: "🌍 Self-paced courses helped me prepare easily",
    rate: "📘 Practice tests and cheat sheets were gold",
    courses: "🧠 Thanks to the instructor’s depth of knowledge",
    rating: "🏆 5 stars — Already started my next course",
  },
  {
    learner: "📈 From intern to software engineer in 4 months",
    countries: "🇩🇪 Living in Berlin, working at a SaaS startup",
    rate: "💻 Loved the hands-on coding style",
    courses: "👨‍🏫 Instructor feedback was quick and helpful",
    rating: "⭐️⭐️⭐️⭐️⭐️ It felt like a real classroom experience",
  },
];

const SuccessStories = () => {
  return (
    <section className="blueBg text-wrap w-full">
      <div className="insideCard">
        <h2 className="sectionHeading">Success Stories</h2>
        <div className="w-full overflow-hidden">
          <div
            className="flexCenter py-4 mx-4 select-none infiniteScroll hover:[animation-play-state:paused] gap-8 w-full"
            aria-hidden="true"
          >
            {/* {
          successList.map((item, index) => (
            // <div className=""></div>
            <StoryCard {...item} key={index} />
            ))          
            } */}
            {/* First visible list */}
            {successList.map((item, index) => (
              <StoryCard {...item} key={`main-${index}`} />
            ))}
            {successList.map((item, index) => (
              <StoryCard {...item} key={`main-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
