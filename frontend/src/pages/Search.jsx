import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import axios from 'axios';
import { serverUrl } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import dp from "../assets/dp.webp"
function Search() {
    const navigate=useNavigate()
    const[input,setInput]=useState(null)
    const [searchData,setSearchData]=useState()
    const dispatch=useDispatch()
    const handleSearch=async ()=>{
     
        try {
            const result=await axios.get(`${serverUrl}/api/user/search?keyWord=${input}`,{withCredentials:true})
           setSearchData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(input){
  handleSearch()
        }
   
    },[input])
    console.log(searchData)
  return (
    <div className='w-full min-h-screen bg-black flex items-center flex-col gap-5 '>
       <div className='w-full h-20  flex items-center gap-5 px-5 absolute top-0 '>
                      <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-6.25  h-6.25 ' onClick={() => navigate(`/`)} />
                 
                  </div>
                  <div className='w-full h-20 flex items-center justify-center mt-20'>
 <div className='w-[90%] max-w-200 h-[80%] rounded-full bg-[#0f1414] flex items-center px-5' >
<FiSearch className='w-4.5 h-4.5 text-white'/>
                    <input type="text" placeholder='search...' className='w-full h-full outline-0 rounded-full px-5 text-white text-[18px]' onChange={(e)=>setInput(e.target.value)} value={input}/>
                  </div>
                  </div>
   {input &&  searchData?.map((user)=>(
<div className='w-[90vw] max-w-175 h-15 rounded-full bg-white flex items-center gap-5 px-1.25 cursor-pointer hover:bg-gray-200' onClick={()=>navigate(`/profile/${user.userName}`)}>
<div className='w-12.5 h-12.5 border-2 border-black rounded-full cursor-pointer overflow-hidden' >
          <img src={user.profileImage || dp} alt="" className='w-full object-cover'/>
      </div>

      <div className='text-black text-[18px] font-semibold'>
        <div>{user.userName}</div>
           <div className='text-[14px] text-gray-400'>{user.name}</div>
      </div>
   
      </div>



))}   

{!input && <div className='text-[30px] text-gray-700 font-bold'>Search Here...</div>}

                  
                  
    </div>
  )
}

export default Search
