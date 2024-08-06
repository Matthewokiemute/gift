import { useRouter } from "next/router";
import React, { useState } from "react";

const CreateGiftForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    giftName: "",
    giftAmount: "",
    giftWinners: "",
    expiresAt: "",
    giftDesc: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the current field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.giftName) tempErrors.giftName = "Gift Name is required.";
    if (!formData.giftAmount)
      tempErrors.giftAmount = "Gift Amount is required.";
    if (!formData.giftWinners || formData.giftWinners < 2)
      tempErrors.giftWinners = "Number of winners should be at least 2.";
    if (!formData.expiresAt)
      tempErrors.expiresAt = "Expiration date is required.";
    if (!formData.giftDesc) tempErrors.giftDesc = "Description is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with form submission
      const params = {
        ...formData,
        expiresAt: new Date(formData.expiresAt).getTime(),
        giftBanner: "https:justdeyplay.com",
      };
      console.log(params);
      console.log("Form submitted", formData);
      router.push("/");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form
        className="flex flex-col items-start gap-3 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start gap-1 w-full">
          <label htmlFor="giftName">Gift Name</label>
          <input
            id="giftName"
            name="giftName"
            type="text"
            onChange={handleChange}
            placeholder="Community giveaway, rewards,..."
            className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
          />
          {errors.giftName && (
            <span className="text-sm text-red-500">{errors.giftName}</span>
          )}
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="giftAmount">Amount</label>
            <input
              id="giftAmount"
              name="giftAmount"
              type="number"
              onChange={handleChange}
              placeholder="Amount each person will receive"
              className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
            />
            {errors.giftAmount && (
              <span className="text-sm text-red-500">{errors.giftAmount}</span>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="giftWinners">Number of Winners</label>
            <input
              id="giftWinners"
              name="giftWinners"
              type="number"
              onChange={handleChange}
              placeholder="No. of lucky winners. (min 2)"
              className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
            />
            {errors.giftWinners && (
              <span className="text-sm text-red-500">{errors.giftWinners}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label htmlFor="expiresAt">Expires At:</label>
          <input
            id="expiresAt"
            name="expiresAt"
            type="datetime-local"
            onChange={handleChange}
            placeholder="Time before it closes.."
            className="border border-slate-300 p-4 outline:border-slate-300 w-full text-black rounded-md"
          />
          {errors.expiresAt && (
            <span className="text-sm text-red-500">{errors.expiresAt}</span>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label htmlFor="giftDesc">Description</label>
          <textarea
            rows="4"
            id="giftDesc"
            name="giftDesc"
            onChange={handleChange}
            placeholder="A brief description e.g This is a random reward for my audience..."
            className="border border-slate-300 p-4 outline:border-slate-300 w-full rounded-md"
          ></textarea>
          {errors.giftDesc && (
            <span className="text-sm text-red-500">{errors.giftDesc}</span>
          )}
        </div>
        <div className="self-center w-full text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 border-none text-white font-semibold rounded-xl w-full max-w-lg"
          >
            Create Gift Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGiftForm;
