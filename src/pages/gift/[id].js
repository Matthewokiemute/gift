import Countdown from '@/components/CountDown'
import PageLayout from '@/components/PageLayout'
import UpdateGiftForm from '@/components/UpdateGiftForm'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const giftData = [
  {
    _id: "32dd23d2ni2",
    id: 1,
    giftName: "Steller Community Reward",
    giftDesc: "We're rewarding 20 women with $50 each for being part of our community.",
    giftWinners: 20,
    giftAmount: 50,
    giftBanner: "/next.svg",
    totalParticipant: 32,
    expiresAt: 1728644400000,
  },
  {
    _id: "43dd23ds2w",
    id: 2,
    giftName: "Celestia Reward",
    giftDesc: "We're rewarding 20 women with $50 each for being part of our community.",
    giftWinners: 160,
    giftAmount: 509,
    giftBanner: "/next.svg",
    totalParticipant: 32,
    expiresAt: 1728644400000,
  },
  {
    _id: "jdwkjd3434",
    id: 3,
    giftName: "Polygon Gift",
    giftDesc: "We're rewarding 20 women with $50 each for being part of our community.",
    giftWinners: 10,
    giftAmount: 90,
    giftBanner: "/next.svg",
    totalParticipant: 32,
    expiresAt: 1728644400000,
  },
]


const gift = () => {
  const router = useRouter();
  const { id: giftId } = router.query;
  const currentGiftId = giftData.findIndex((gift) => gift._id === giftId);
  const currentGift = giftData[currentGiftId] || {};
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    };

    getWalletAddress();
  }, []);

  const handleSubmit = () => {
    if (!walletAddress) {
      console.error("Wallet not connected.");
      return;
    }

    const params = {
      walletAddress,
      giftId: currentGift._id,
    };

    console.log("Submitting to blockchain:", params);
    // Send the params to the blockchain
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold text-center mt-6 mb-4 text-slate-600">Participate in Gift</h1>
      {/* <UpdateGiftForm giftData={currentGift}/> */}
      <div className="h-auto flex flex-col gap-6 rounded-2xl p-10  md:pb-10 bg-[#FFFFFF] mx-auto w-full max-w-3xl no-scrollbar">
        <div className='w-full h-1/4 rounded-md object-cover'>
          <img src={currentGift.giftBanner} alt={currentGift.giftName} className='object-cover w-full h-auto' />
        </div>
        <div className='flex items-center justify-center py-3'>
         {currentGift?.expiresAt ?  <Countdown timestamp={currentGift.expiresAt} /> : null}
        </div>
        <div className="w-full mx-auto">
          <h1>{currentGift.giftName}</h1>
        </div>
        <div className='py-4'>
          <p>
            {currentGift.giftDesc}
          </p>
        </div>
        <div className='flex items-center gap-5'>
          <div>No. Winners: {currentGift.giftWinners}</div>
          <div>Amount to be Won: ${currentGift.giftAmount}</div>
          <div>Current Participants: {currentGift.totalParticipant}</div>
          <div>Closes: {currentGift.expiresAt}</div>
        </div>
        <button onClick={handleSubmit} className="bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 border-none text-white font-semibold rounded-xl">
          Join the Pool
        </button>
      </div>
    </PageLayout>
  )
}

export default gift