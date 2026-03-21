// import { createSlice } from "@reduxjs/toolkit";

// const savedToken = localStorage.getItem("accessToken");
// const savedRole = localStorage.getItem("role");

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     accessToken: savedToken || null,
//     role: savedRole || null
//   },
//   reducers: {
//     setCredentials(state, action) {
//       const { accessToken, role } = action.payload;
//       state.accessToken = accessToken;
//       state.role = role;

//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("role", role);
//     },
//     logout(state) {
//       state.accessToken = null;
//       state.role = null;
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("role");
//     }
//   }
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    role: null
  },
  reducers: {
    setCredentials(state, action) {
      const { accessToken, role } = action.payload;
      state.accessToken = accessToken;
      state.role = role;
    },
    logout(state) {
      state.accessToken = null;
      state.role = null;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;