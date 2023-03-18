import React from "react";

const YourLinks = () => {
  return (
    <div className="mt-8 flex flex-col justify-center gap-3 md:w-4/6">
      <div className="flex justify-between text-gray-300">
        <h5 className="text-2xl font-bold uppercase ">Your Links </h5>
        <button className="text-sm capitalize font-normal hover:text-[#F9A826]">
          Show original
        </button>
      </div>
      <div className="flex">
        <p className="w-full focus:outline-none border border-[#F9A826] bg-stone-800 text-stone-300 px-6 py-2 rounded-l-lg">
          https://shrtco.de/XuZsS
        </p>
        <button
          title="copy to clipboard"
          className="w-fit rounded-r-lg bg-[#F9A826] px-4 py-1 border border-[#F9A826] hover:bg-stone-800 hover:text-[#F9A826] font-semibold "
        >
          <FaRegCopy />
        </button>
      </div>
    </div>
  );
};

export default YourLinks;
