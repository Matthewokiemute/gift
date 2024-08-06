import React, { useState } from "react";
import {HiX} from "react-icons/hi"

const UpdateGiftForm = ({ giftData, setEditGiftForm }) => {
  const [formData, setFormData] = useState(giftData);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(initialData)
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  // console.log(giftData?.giftName)
  return (
    <div className="w-screen h-[92vh] fixed bottom-0 left-0 bg-[rgba(27,_27,_28,_0.2)] z-50 flex items-center justify-center md:h-screen">
        <div className="h-auto flex flex-col gap-6 rounded-2xl p-10  md:pb-10 bg-[#FFFFFF] mx-auto w-full max-w-3xl no-scrollbar">
        {/* Heading */}
        <div className="flex items-center justify-between w-full">
            <h2 className="flex-1 text-center font-medium text-[17px]">
              Edit Gift Details
            </h2>
            <div
              className="cursor-pointer"
              onClick={() => setEditGiftForm(false)}
            >
              <HiX className="text-3xl hover:bg-gray-200 p-1 duration-500 ease-linear rounded-full" />
            </div>
          </div>
      <div className="w-full mx-auto">
        <form className="flex flex-col items-start gap-3 w-full  mx-auto">
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="giftName">Gift Name</label>
            <input
              id="gitfName"
              name="giftName"
              type="text"
              value={formData?.giftName}
              onChange={(e) => handleChange(e)}
              placeholder={giftData?.giftName}
              className="border border-slate-300 p-4 outline:border-slate-300 w-full text-black rounded-md"
            />
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex flex-col items-start gap-1 w-full">
              <label htmlFor="giftAmount">Amount</label>
              <input
                id="giftAmount"
                name="giftAmount"
                type="number"
                onChange={(e) => handleChange(e)}
                value={formData?.giftAmount}
                placeholder="Amount each person will receive"
                className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label htmlFor="giftWinners">Number of Winners</label>
              <input
                id="giftWinners"
                name="giftWinners"
                type="number"
                onChange={(e) => handleChange(e)}
                value={formData?.giftWinners}
                placeholder="No. of lucky winners. (min 2)"
                className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="expiresAt">Expires At:</label>
            <input
              id="expiresAt"
              name="expiresAt"
              type="datetime-local"
              value={formData?.expiresAt}
              onChange={(e) => handleChange(e)}
              placeholder={giftData?.expiresAt}
              className="border border-slate-300 p-4 outline:border-slate-300 w-full text-black rounded-md"
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="giftDesc">Description</label>
            <textarea
              rows="4"
              id="giftDesc"
              name="giftDesc"
              type="text"
              onChange={(e) => handleChange(e)}
              value={formData?.giftDesc}
              placeholder="A brief description e.g This is a random reward for my audience..."
              className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
            ></textarea>
          </div>
          <div className="flex items-center  gap-8 self-center w-full text-center">
            <button className="bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 border-none text-white font-semibold rounded-xl w-full max-w-lg">
              Update Gift Link
            </button>
            <button className="bg-gradient-to-r from-red-400 to-slate-400 px-5 py-3 border-none text-white font-semibold rounded-xl w-full max-w-lg">
              Cancel Gift
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default UpdateGiftForm;
