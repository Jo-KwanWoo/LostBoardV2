import { configureStore, createSlice } from '@reduxjs/toolkit'

let characterName = createSlice({
    name : 'characterName',
    initialState : '',
    reducers:{
        setName(state, action){
            state = action.payload
            return action.payload
        }
    }
})

export let {setName} = characterName.actions

export default configureStore({
  reducer: {
    characterName : characterName.reducer
   }
})