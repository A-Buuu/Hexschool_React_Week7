import { createSlice } from "@reduxjs/toolkit";


const toastSlice = createSlice({
  name: "toastName",
  initialState: {
    messages: [],
  },
  reducers: {// 即 actions
    pushMessage(state, action) {
      const { text, status } = action.payload;
      state.messages.push({
        id: Date.now(),
        text,
        status
      })
    }
  }
});

// 從 slice 中的 reducers 中匯出該方法
export const { pushMessage } = toastSlice.actions;

export default toastSlice.reducer;