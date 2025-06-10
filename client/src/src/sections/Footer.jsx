import React from "react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add real subscription logic here
    console.log(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <div className="w-full">
      <div className="text-slate-800 dark:text-slate-50 sm:flex justify-between mx-auto w-full">
        {/* Left Column */}
        <div className="p-5 max-sm:pb-0 sm:w-8/12">
          <h3 className="text-3xl textTitle font-normal cursor-pointer max-sm:pb-0 pb-2">
            Code Point
          </h3>
          <div className="flex text-gray-500 uppercase text-sm space-x-4 max-sm:hidden max-sm:h-0">
            <a href="#" className="hover:text-white">
              Home
            </a>
            <a href="#" className="hover:text-white">
              About Us
            </a>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
            <a href="#" className="hover:text-white">
              Support Us
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-5 sm:w-4/12">
          <h3 className="font-medium text-lg text-slate-800 dark:text-slate-50 mb-4 select-none">
            Subscribe to our Newsletter
          </h3>
          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              className="border border-slate-400 rounded w-full px-4 py-3 text-slate-800 dark:text-slate-50 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="username@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-dark">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex py-5 m-auto text-slate-800 dark:text-slate-50 text-sm flex-col items-center border-t max-w-screen-xl select-none">
        <p>© Copyright 2020. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
