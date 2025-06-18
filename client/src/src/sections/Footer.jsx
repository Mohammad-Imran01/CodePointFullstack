import React from "react";
import { useState } from "react";
import AppLogo from "../../components/shared/AppLogo";
import { map } from "lodash";

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
      <div className="dark:text-slate-50 mx-auto w-full justify-between text-slate-800 sm:flex">
        {/* Left Column */}
        <div className="flex flex-col gap-2 p-5 max-sm:pb-0 sm:w-8/12">
          <AppLogo />
          <div className="flex space-x-4 text-sm uppercase text-gray-500 max-sm:hidden max-sm:h-0">
            {["Home", "About us", "Contact us", "Support us"].map(
              (item, ind) => (
                <a
                  key={ind}
                  href={`#${ind}`}
                  className="text-stone-500 hover:text-stone-700"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="p-5 sm:w-4/12">
          <h3 className="dark:text-slate-50 mb-4 select-none text-lg font-medium text-slate-800">
            Subscribe to our Newsletter
          </h3>
          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              className="dark:text-slate-50 focus:shadow-outline w-full rounded border border-slate-400 px-4 py-3 leading-tight text-slate-800 focus:outline-none"
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
      <div className="dark:text-slate-50 m-auto flex max-w-screen-xl select-none flex-col items-center border-t py-5 text-sm text-slate-800">
        <p>© Copyright 2020. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
