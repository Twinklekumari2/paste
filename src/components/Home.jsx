import React, { useEffect } from 'react'
import { use } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updatePaste } from '../redux/PasteSlice';


const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
          const paste = allPastes.find((p) => p._id === pasteId);
          setTitle(paste.title);
          setValue(paste.content);

        }
    }, [pasteId])
    

    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || 
                  Date.now().toString(36),
            createdAt: new Date().toISOString()
        }
        if(pasteId){
            //update
            dispatch(updatePaste(paste))
        }
        else{
            //create
            dispatch(addToPaste(paste))
        }

        //after deletion and updation
        setTitle("");
        setValue("");
        setSearchParams({});
    }
  return (
    <div className='w-1/2 mx-auto my-1 flex flex-col h-full p-3 '>
        <div className='flex felx-row justify-between'>
          <input className='outline-none border-b-2 rounded p-2 w-1/2'
             type="text"
             placeholder='Enter title' 
             value={title}
             onChange={(e) => setTitle(e.target.value)}
          />
          <button className='border-orange-400 bg-orange-300 rounded py-1 px-2 cursor-pointer' 
          onClick={createPaste}>
          {
            pasteId ? "Update my Paste" : "Create my Paste"
          }
          </button>
       </div>
      
       <div className='mt-5 w-full'>
        <textarea 
           className='w-full border-2 p-3 outline-none min-w-[500px]'
           value={value}
           onChange={(e) => setValue(e.target.value)}
           rows={20}
           placeholder='Enter your content here'
        />
       </div>
    </div>
    
  )
}

export default Home
