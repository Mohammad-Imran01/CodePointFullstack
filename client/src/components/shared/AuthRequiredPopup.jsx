import React from "react";
import { useNavigate } from "react-router";

const AuthRequiredPopup = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Animated Gradient Border Wrapper */}
      <div
        className={`
          duration-400 fixed bottom-0 left-1/2 z-50 w-[95vw]
          max-w-md
          -translate-x-1/2 transition-transform
          ${open ? "-translate-y-10" : "translate-y-full"}
        `}
        style={{ transitionTimingFunction: "cubic-bezier(.4,0,.2,1)" }}
      >
        <div className="animated-gradient-border">
          {/* Popup Content */}
          <div className="flex flex-col items-center rounded-2xl bg-white/95 p-10 shadow-2xl">
            <div className="mb-3 text-lg font-semibold text-gray-800">
              You must be signed in
            </div>
            <div className="mb-6 text-center text-sm text-gray-500">
              Please sign in or create an account to continue.
            </div>
            <div className="flex w-full gap-3">
              <button
                className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
              <button
                className="flex-1 rounded-lg border border-blue-600 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRequiredPopup;
