import React from 'react'
import Hero from '@/assets/hero.svg'
import TopElement from '@/assets/elementtop.svg'
import BottomElement from '@/assets/elementbottom.svg'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const handleNaviagtion = (path) => {
        navigate(path)
    }
    return (
        <div className='relative h-full flex-1 flex items-center justify-center flex-col w-full '>
            <img src={TopElement} className='absolute left-0 right-0 top-0 w-full' />
            <div className=''>
                <img src={Hero} className='mx-auto' />
            </div>
            <div className='flex flex-col gap-4 items-center justify-center mt-20 w-full'>
                <button onClick={() => handleNaviagtion('/register')} className='uppercase text-white bg-[#0078B6] text-center w-full max-w-[260px] py-2 rounded-full font-semibold cursor-pointer'>
                    Register Now
                </button>
                <button onClick={() => handleNaviagtion('/generateposter')} className='uppercase text-white bg-[#0078B6] text-center w-full max-w-[260px] py-2 rounded-full font-semibold cursor-pointer'>
                    Generate Poster
                </button>
            </div>
           
            <img src={BottomElement} className='absolute w-full bottom-6' />
        </div>
    )
}

export default Home
