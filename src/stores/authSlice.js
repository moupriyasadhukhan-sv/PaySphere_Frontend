// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     accessToken: null,
//     role: null
//   },
//   reducers: {
//     setCredentials(state, action) {
//       const { accessToken, role } = action.payload;
//       state.accessToken = accessToken;
//       state.role = role;
//     },
//     logout(state) {
//       state.accessToken = null;
//       state.role = null;
//     }
//   }
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     accessToken: null,
//     role: null,
//     userId: null,
//     merchantId: null,
//     walletId: null,
//   },
//   reducers: {
//     setCredentials(state, action) {
//       const { accessToken, role, userId, merchantId } = action.payload;
//       state.accessToken = accessToken;
//       state.role = role;
//       state.userId = userId;
//       state.merchantId = merchantId;
//     },
//     setWalletId(state, action) {
//       state.walletId = action.payload;
//     },
//     logout(state) {
//       state.accessToken = null;
//       state.role = null;
//       state.userId = null;
//       state.merchantId = null;
//       state.walletId = null;
//     }
//   }
// });

// export const { setCredentials, setWalletId, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
 
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    role: null,
    userId: null,
    merchantId: null,
    walletId: null,
  },
  reducers: {
    setCredentials(state, action) {
      const { accessToken, role, userId, merchantId } = action.payload;
      state.accessToken = accessToken;
      state.role = role;
      state.userId = userId;
      state.merchantId = merchantId;
    },
    setWalletId(state, action) {
      state.walletId = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.role = null;
      state.userId = null;
      state.merchantId = null;
      state.walletId = null;
    }
  }
});
 
export const { setCredentials,setWalletId, logout } = authSlice.actions;
export default authSlice.reducer;
