import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const Link = ({link}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(link)
    setIsCopied(true)
    toast.success("copied to clipboard")
  }

  return (
    <div className="md:w-4/6 mt-8 flex justify-center lg:justify-start">
      <p className="w-full focus:outline-none border border-[#F9A826] bg-stone-800 text-stone-300 px-6 py-2 rounded-l-lg truncate ...">
        {link}
      </p>
      <button
        onClick={handleCopyClick}
        title="copy to clipboard"
        className="flex gap-1 items-center w-fit rounded-r-lg bg-[#F9A826] px-4 py-1 border border-[#F9A826] hover:bg-stone-800 hover:text-[#F9A826] hover:border-l-0 font-semibold "
      >
        <FaRegCopy /> <span>{isCopied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
};

export default Link
