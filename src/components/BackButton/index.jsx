import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function BackButton({ label }) {
    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate('/')
    }
    return (
        <div onClick={handleNavigation} className='cursor-pointer flex items-center gap-2 justify-start'>
            <div className='flex items-center justify-center w-8 h-8 bg-[#185273] rounded-full cursor-pointer text-white transition-all ease-in-out hover:bg-[#185273]/70 hover:shadow-lg'>
                <ChevronLeft size={28}/>
            </div>
            {label && <p className='text-[#185273] font-semibold text-lg  capitalize'>{label}</p>}
        </div>
    )
}

export default BackButton
