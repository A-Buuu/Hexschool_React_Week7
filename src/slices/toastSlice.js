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
    },
    removeMessage(state, action) {
      const message_id = action.payload;

      const index = state.messages.findIndex((message) => message.id === message_id);
      if (index !== -1){
        state.messages.splice(index, 1);
      }
    }
  }
});

// 從 slice 中的 reducers 中匯出該方法
export const { pushMessage, removeMessage } = toastSlice.actions;

export default toastSlice.reducer;