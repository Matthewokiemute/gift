import React from 'react'
import Header from './Header'
import Footer from './Footer'

const PageLayout = ({children}) => {
  return (
    <div className='px-6 mx-auto'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default PageLayout