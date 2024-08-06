import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="py-8 px-6 flex items-center justify-between text-black">
      <Link href="/">
        <div className="text-3xl font-semibold">
          <span className="text-cyan-400 from-indigo-400 to-cyan-400">
            Gift
          </span>
          oken
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <button className="bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 border-none text-white font-semibold rounded-xl">
          Connect Wallet
        </button>
        <Link href="/links">
          <div className="border-solid px-5 py-2.5 border-black hover:border-slate-300 animate-in ease-in-out border-[0.5px] text-black hover:text-slate-500 font-medium rounded-2xl">
            My Gifts 🎉
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
