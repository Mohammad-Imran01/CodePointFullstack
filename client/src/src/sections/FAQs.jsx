import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is Tailwind CSS?",
    answer:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
  },
  {
    id: 2,
    question: "What is Alpine.js?",
    answer:
      "Alpine.js is a minimal framework for composing behavior directly in your HTML. It's like jQuery for the modern web.",
  },
  {
    id: 3,
    question: "How do I use Tailwind with Alpine.js?",
    answer:
      "You can use Tailwind CSS for styling and Alpine.js for interactivity. They work seamlessly together to create lightweight, dynamic components.",
  },
  {
    id: 4,
    question: "What is Tailwind CSS?",
    answer:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
  },
  {
    id: 5,
    question: "What is Alpine.js?",
    answer:
      "Alpine.js is a minimal framework for composing behavior directly in your HTML. It's like jQuery for the modern web.",
  },
  {
    id: 6,
    question: "How do I use Tailwind with Alpine.js?",
    answer:
      "You can use Tailwind CSS for styling and Alpine.js for interactivity. They work seamlessly together to create lightweight, dynamic components.",
  },
];

const FAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className=" text-wrap w-full">
      <div className="blueBg insideCard">
        <h1 className="sectionHeading">Frequently Asked Questions</h1>
        <ul>
          {faqData.map(({ id, question, answer }) => (
            <li
              key={id}
              className="mb-4 rounded-lg border border-slate-400 bg-white/30 dark:bg-slate-700/30 text-stone-800 dark:text-stone-100 shadow-sm/30"
            >
              <button
                onClick={() => toggle(id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold">{question}</span>
                <span>{openId === id ? "−" : "+"}</span>
              </button>
              {openId === id && (
                <div className="px-6 pb-4 transition-opacity duration-300 ease-in-out text-stone-700 dark:text-stone-200">
                  <p className="">{answer}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQs;
