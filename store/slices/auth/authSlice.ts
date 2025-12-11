import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { name: "", accessToken: "" },
    reducers: {
        login: (state, action) => {
            console.log("action :", action);
            state.name = action.payload
        }
    }
})

export const { login } = authSlice.actions;
export default authSlice.reducer;