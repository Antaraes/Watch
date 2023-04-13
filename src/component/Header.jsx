import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const headers = [
        {
            name:'Home',
            path:'/'
        },
        {
            name:'Alarm',
            path:'/alarm'
        },
        {
            name:'World Clock',
            path:'/worldclock',
        },
        {
            name:'Stop Watch',
            path:'/stopwatch',
        },
        {
            name:'Timer',
            path:'/timer',
        }
    ]
  return (
    <div className=' text-secondary-color min-h-[60px] py-1 px-10 flex justify-center items-center w-full '>
        <nav>
            <ul className="flex justify-between gap-10">
                {
                    headers.map((headerInfo,index)=>
                    <li key={index} className="hover:text-white">
                        <NavLink to={headerInfo.path}>
                            {headerInfo.name}
                        </NavLink>
                    </li>
                    )
                }
            </ul>
        </nav>
    </div>
  )
}

export default Header