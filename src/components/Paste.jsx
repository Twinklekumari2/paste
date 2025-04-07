import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { copyPaste, deleteFromPaste, updatePaste } from '../redux/PasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const paste = useSelector(state => state.paste.pastes) // state.name.keyName
    const filteredData = paste.filter((paste) => (
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    const dispatch = useDispatch();

    function handleDelete(paste){
        dispatch(deleteFromPaste(paste));
    }
    function handleUpdate(paste){
        dispatch(updatePaste(paste));
    }

  return (
    <div className='w-1/2 mx-auto my-1 rounded-2xl flex flex-col justify-center align-middle p-2'>
      <input 
      className='outline-none border-2 p-2 rounded-2xl'
      type="text"
      placeholder='Search paste'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='mt-3 '>
         {
           filteredData.length > 0 ? 
           filteredData.map((paste) => {
            return (
                <div className='border-2 rounded-2xl flex flex-col p-2 mb-3' key={paste?._id}>
                    <h1>{paste.title}</h1>
                    <p>{paste.content}</p>
                    <div className='flex flex-row justify-evenly'>
                    <button className='border-2 py-1 px-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-indigo-300 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:translate-y-1 '>
                        <Link to={`/paste/${paste?._id}`}>
                        View
                        </Link>   
                    </button>
                    <button  className='border-2 py-1 px-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-indigo-300 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:translate-y-1 '>
                        Share
                    </button>
                    <button className='border-2 py-1 px-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-indigo-300 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:translate-y-1 '
                    onClick={() => handleDelete(paste)}>
                        Delete
                    </button>
                    <button className='border-2 py-1 px-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-indigo-300 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:translate-y-1 '
                    onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied to Clipboard")
                    }  
                    }>
                        Copy
                    </button>
                    <button className='border-2 py-1 px-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-indigo-300 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:translate-y-1 '>
                        <Link to={`/?pasteId=${paste?._id}`}>
                        Edit
                        </Link>
                       
                    </button>

                    </div>
                    
                </div>
            )
           })
           : <p className='text-red-600'>No Paste is availabe</p>
        }  
      </div>
    </div>
  )
}

export default Paste
