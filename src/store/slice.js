import { createSlice } from '@reduxjs/toolkit'
import {StringList} from "../data/StringList"

let choosenList=()=>StringList.sort(() => Math.random() - 0.5)
console.log(StringList)

const initialState = {
  value: choosenList().slice(0,10),
  seconds:30,
  word:"",
  targetWord:0,
  correct:0,
  mistake:0
}



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   wordSetter: (state, action) => {
      state.value = action.payload
    },
    timeChange: (state,action)=>{
        state.seconds-=1
    },
    resetTime: (state)=>{
      state.value=choosenList().slice(0,10)
      state.targetWord=0
      state.correct=0
      state.mistake=0
      state.seconds=30
    },
    wordControl:(state,action)=>{
      if(state.value[state.targetWord]==action.payload.replace(" ","")){
        state.correct+=1
        state.targetWord+=1
      }else{
        state.mistake+=1
        state.targetWord+=1
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { wordSetter,timeChange,resetTime,wordControl } = counterSlice.actions

export default counterSlice.reducer