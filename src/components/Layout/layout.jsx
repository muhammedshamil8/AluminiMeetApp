import React from 'react'
import Background from '@/assets/background.svg'
import { Outlet } from 'react-router-dom'
import Connect from '@/assets/connect.svg'

function Layout() {
    return (
        <div className="bg-gray-500 min-h-[100dvh] select-none">
            <div
                className="max-w-[640px] !mx-auto bg-[#F0FAFF] h-full min-h-[100dvh] shadow  flex flex-col justify-between"
                style={{ backgroundImage: `url(${Background})` }}
            >
                <Outlet />
                <p className='mx-auto my-4 text-[15px]'>
                    Crafted by <a href='https://connectemea.in' target='_blank' className='text-[#F58258] font-semibold cursor-pointer' >Connect <img src={Connect} className='inline w-6' /></a>
                </p>
            </div>
        </div>
    )
}

export default Layout;
