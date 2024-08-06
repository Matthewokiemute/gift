import PageLayout from '@/components/PageLayout';
import UpdateGiftForm from '@/components/UpdateGiftForm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa';

const giftData = [
  {
    _id: "32dd23d2ni2",
    id: 1,
    giftName: "Steller Community Reward",
    giftDesc: "We're rewarding 20 women with $50 each for being part of our community.",
    giftWinners: 20,
    giftAmount: 50,
    giftBanner: "/next.svg",
    totalParticipant: 4,
    expiresAt: '2024-12-05',
  },
  {
    _id: "43dd23ds2w",
    id: 2,
    giftName: "Celestia Reward",
    giftDesc: "We're rewarding 20 women with $50 each for being part of our community.",
    giftWinners: 160,
    giftAmount: 509,
    giftBanner: "/next.svg",
    totalParticipant: 16,
    expiresAt: '2024-12-05',
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
    expiresAt: '2024-12-05',
  },
]


const AllLinks = () => {
  const [editGiftForm, setEditGiftForm] = useState(false)
  const [currentGift, setCurrentGift] = useState({})

  const handlePopUp = (id, e) => {
    e.preventDefault();
    setEditGiftForm(true)
    const letId = id;
    console.log(letId);
    const currentGiftId = giftData.findIndex((id) => id._id === letId)

    const currentGiftData = giftData[currentGiftId] || {};
  
    setCurrentGift(currentGiftData)
  }
  return (
    <>
    {editGiftForm && (
      <UpdateGiftForm setEditGiftForm={setEditGiftForm} giftData={currentGift} />
    )}
    <PageLayout>
      <div className='container px-6 mt-4'>
        <h1 className="text-3xl font-bold mb-4 text-slate-600">All my gifts 🎉</h1>
        <div className='mt-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4'>
            {giftData?.map((gift) =>
              <div key={gift.id} className='border border-slate-300 rounded-md max-w-md'>
                <div className='w-full h-32 bg-slate-300'>
                  <Image src={gift.giftBanner} alt={gift.giftName} width={800} height={400} className='object-cover' />
                </div>
                <div className='flex flex-col items-start gap-2 p-3'>
                  <h1>{gift.giftName}</h1>
                  <p>{gift.giftDesc}</p>
                  <div className='flex flex-row items-center justify-between gap-3 w-full'>
                    <span>Winners: {gift.giftWinners}</span>
                    <span>Amount: ${gift.giftAmount}</span>
                  </div>
                  <div className='flex flex-row items-center justify-between gap-3 w-full py-2'>
                    <button className="bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 border-none text-white font-semibold rounded-lg w-full">Release</button>
                    {/* <Link href={`/update-link/${gift._id}`}> */}
                      <button onClick={(e) => handlePopUp(gift._id, e)} className="border-solid px-5 py-2.5 border-black hover:border-slate-300 animate-in ease-in-out border-[0.5px] text-black hover:text-slate-500 font-medium rounded-lg w-full">Edit</button>
                    {/* </Link> */}
                  </div>
                  <div className='flex flex-row items-center justify-between w-full'>
                    <p className='text-base font-medium'>Participants:</p>
                    <span className='text-cyan-400 flex items-center gap-1'><FaUserFriends />{gift.totalParticipant}</span>
                  </div>
                  <div className='flex flex-row items-center justify-between w-full'>
                    <p className='text-base font-medium'>Closes At:</p>
                    <span className='text-cyan-400 flex items-center gap-1'><FaUserFriends />{gift.expiresAt}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout> 
    </>
  )
}

export default AllLinks;