import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem('email'),
  token: localStorage.getItem('token'),
  id: localStorage.getItem('id'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    updateUser(state, action) {
      state.email = action.payload.email;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const {setUser, removeUser, updateUser} = userSlice.actions;

export default userSlice.reducer;

