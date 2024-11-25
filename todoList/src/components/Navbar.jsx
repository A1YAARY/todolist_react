import React from 'react'

const Navbar = () => {
  return (
   <>
   <div className="navbar flex flex-row justify-around bg-violet-400 w-full h-9">
    <div className="flex text-white px-3 text-2xl justify-center items-center"> Itask</div>

    <ul className="flex flex-row px-4 gap-5 text-xl">
        <li className="flex justify-center items-center cursor-pointer hover:font-bold transition-all duration-75 text-white"> Home</li>
        <li className="flex justify-center items-center cursor-pointer hover:font-bold transition-all duration-75  text-white"> Your Task </li>
    </ul>
   </div>
   </>
  )
}

export default Navbar