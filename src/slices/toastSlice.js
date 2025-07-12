import { createSlice } from "@reduxjs/toolkit";


const toastSlice = createSlice({
  name: "toastName",
  initialState: {
    messages: [
      {
        id: Date.now(),
        text: "hello",
        status: "success",
      },
    ],
  },
});

export default toastSlice.reducer;