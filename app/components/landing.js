import React from 'react'
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import Box from './box';
import Footer from './footer';
const Landing = () => {
  return (
    <>
      <div className='text-white bg-gradient-to-r from-green-600 to-blue-400
      flex flex-col justify-center align-middle h-[60vh]'>
        {/* <div className="logo w-fit mx-auto ">
           <ExploreOutlinedIcon/>
        </div> */}
        <div className="heading text-7xl w-fit mx-auto max-md:text-5xl font-bold">
            Learn Quran
        </div>
        <div className="text-gray-200 text-center w-[40vw] mx-auto mt-3 text-xl max-md:text-sm max-md:w-[60vw]">
            Discover the beauty and wisdom of the Holy Quran with translations, commentary, and personal study tools!
        </div>
        <div className="quote w-fit mx-auto text-center max-md:text-sm font-semibold max-md:mt-3 mt-5">
           &apos;And We have certainly made the Quran easy for remembrance, so is there any who will remember?&apos;
        </div>
      </div>
      <div className='bg-gray-100'>
        <p className='text-4xl w-fit mx-auto max-md:text-3xl pt-3'>Begin Your Journey</p>
        <p className='text-center mx-auto max-md:w-[80vw] w-[40vw] text-xl max-md:text-sm text-gray-400 mt-5 max-md:mt-3'>Choose your path to explore and understand the Quran with our comprehensive tools and resources</p>
        <div className="boxes p-7 flex gap-3 w-fit mx-auto max-md:flex-col">
            <Box number={1}/>
            <Box number={2}/>
            <Box number={3}/>

        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Landing
