import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 text-black'>
        <div className='px-12 py-10 flex items-center justify-between'>
         <div className='flex items-center gap-4'>
         <FaFacebook />
         <FaTwitter />
         </div>
         <div className='flex items-center gap-8'>
            <p>2K+ Users</p>
            <p>$35k Airdrop</p>
            <p>11+ Partners</p>
         </div>
         <div>
            <p>Powered by Scroll</p>
         </div>
        </div>
    </div>
  )
}

export default Footer