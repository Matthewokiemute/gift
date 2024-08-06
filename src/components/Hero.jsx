import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex items-center justify-center text-center mt-28">
      <div className="flex flex-col gap-6 items-center">
        <p className="text-[80px] leading-[72px] w-2/4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold">
          Send tokens/airdrops to multiple addresses.
        </p>
        <p className="text-black font-medium">
          Share joy with your community and audience 🎉
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/create-gift"
            className="bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 border-none text-white font-semibold rounded-xl"
          >
            Create Gift
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
