import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("final paste",paste);
   

  

  return (
    <div className='w-1/2 mx-auto my-1 flex flex-col h-full p-3 '>
        <div className='flex felx-row justify-between'>
          <input className='outline-none border-b-2 rounded p-2 w-full cursor-not-allowed'
             type="text"
             disabled
             value={paste.title}
          />
          
       </div>
      
       <div className='mt-5 w-full'>
        <textarea 
           className='w-full border-2 p-3 outline-none min-w-[500px] cursor-not-allowed'
           value={paste.content}
           disabled
           rows={20}
           placeholder='Enter your content here'
        />
       </div>
    </div>
    
  )
}

export default ViewPaste
