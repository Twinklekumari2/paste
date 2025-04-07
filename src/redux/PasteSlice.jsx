import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';


const initialState = {
    pastes : localStorage.getItem ("pastes") 
      ? JSON.parse(localStorage.getItem("pastes")) 
      : []
}
export const pasteSlice = createSlice({
    name:"paste",
    initialState,
    reducers: {
        isEmpty: (state,action) => {
            const paste = action.payload;
            if(!paste.title.trim() || !paste.content.trim()){
                toast.error("Paste can't be empty");
                return;
            }
        },
        addToPaste: (state,action) => {
            const paste = action.payload;
            const isDuplicate = state.pastes.some(p => p.title === paste.title);
            if(isDuplicate){
                toast("Paste with this title already exists!")
            }
            else{

                state.pastes.push(paste);
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
                toast.success("paste created successfully");
            }

        },
        deleteFromPaste: (state,action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if(index>=0){
                state.pastes.splice(index,1);
                localStorage.removeItem("pastes",JSON.stringify(state.pastes))
            }

        },
        updatePaste: (state,action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if(index>=0){
                state.pastes[index] = paste;
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
                toast.success("Updated successfully");
            }

        },
        resetPaste: (state,action) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("Deleted paste successfully");

        },
        copyPaste: (state,action) => {
            const paste = action.payload;
            const text = paste.content;
            navigator.clipboard.writeText(text);
            toast.success("Copied Successfully");

        }
    }
})

export const {addToPaste, deleteFromPaste, updatePaste, resetPaste, copyPaste } = pasteSlice.actions
export default pasteSlice.reducer