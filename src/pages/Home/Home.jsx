import React from 'react'
import Hero from '@/assets/hero.webp'
import TopElement from '@/assets/elementtop.svg'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const handleNaviagtion = (path) => {
        navigate(path)
    }
    return (
        <div className='relative h-full flex-1 flex items-center justify-center flex-col w-full '>
            <div className='max-h-[70px]  w-full absolute top-0'>
                <div className='flex justify-start items-start relative'>
                    <img src={TopElement} className='absolute left-0 right-0 top-0 w-full   ' />
                </div>
            </div>
            <div className='mt-20 min-h-[300px]'>
                <img src={Hero} className='mx-auto' />
            </div>
            <div className='flex flex-col gap-4 items-center justify-center mt-20 w-full mb-10'>
                <button onClick={() => handleNaviagtion('/register')} className='uppercase text-white bg-[#0078B6] text-center w-full max-w-[260px] py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg'>
                    Register Now
                </button>
                <button onClick={() => handleNaviagtion('/generateposter')} className='uppercase text-white bg-[#0078B6] text-center w-full max-w-[260px] py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg'>
                    Generate Poster
                </button>
            </div>

        </div >
    )
}

export default Home
