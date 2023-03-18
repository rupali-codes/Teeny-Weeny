import { useState, useEffect } from "react";
import meditation from "../assets/meditation.svg";
import axios from "axios";
import { FaCut } from "react-icons/fa";
import Link from "./Link";
import { toast } from "react-toastify";

function Index() {
  const [data, setData] = useState("");
  const [url, setUrl] = useState("");
  const [isShorted, setIsShorted] = useState(false)

  useEffect(() => {
    const savedData = { ...localStorage };
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!url) {
      toast.warning("please enter a valid link")
      return
    }
    const res = await axios.get(
      `https://api.shrtco.de/v2/shorten?url=${url}/very/long/link.html`
    );
    const data = await res.data;
    setData(data)

    data?.ok && localStorage.setItem(url, data.result.full_short_link);
    setIsShorted(true)
    setUrl('')
  };

  return (
    <div className="md:flex  bg-stone-900 min-h-screen w-screen md:text-left text-center p-8 md:p-16 ">
      <div className="md:w-1/2">
        <h5 className="text-4xl text-stone-300 font-semibold italic">
          ___Teeny Weeny___
        </h5>
        <p className="text-stone-300 py-2 text-6xl font-bold opacity-4 ">
          Get Your Links <span className="text-[#F9A826]">Shorten</span> in{" "}
          <span className="text-[#F9A826]">Seconds</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className=" md:w-4/6 mt-8 flex justify-center lg:justify-start"
        >
          <input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="https://short-my-link..."
            className="w-full focus:outline-none border border-[#F9A826] bg-stone-800 text-stone-300 px-6 py-2 rounded-l-lg"
          />
          <button
            type="submit"
            className="flex gap-1 items-center w-fit rounded-r-lg bg-[#F9A826] px-4 py-1 border border-[#F9A826] hover:bg-stone-800 hover:text-[#F9A826] font-semibold hover:border-l-0"
          >
            <FaCut /> Short
          </button>
        </form>

        {
          isShorted && <Link link={data?.result?.full_short_link} />
        }
      </div>
      <div
        className="w-1/2 md:block hidden
      "
      >
        <img src={meditation} alt="" className="w-2/3 mx-auto" />
      </div>
    </div>
  );
}

export default Index;
