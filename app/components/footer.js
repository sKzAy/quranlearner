import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full p-3 flex flex-col bg-blue-950 text-center justify-center">
        <p className='text-gray-300'>May Allah guide us all on the straight path. Ameen.</p>
        <a className='bg-gradient-to-r from-blue-800 to-blue-900 text-gray-300 w-fit p-2 rounded-xl mx-auto  transition-all hover:transition-all duration 500 hover:shadow-xl hover:text-white' href="">Donate</a>
      </div>
    </>
  )
}

export default Footer
