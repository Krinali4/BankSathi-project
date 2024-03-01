// import {
//   FETCH_USER_DATA_REQUEST,
//   FETCH_USER_DATA_SUCCESS,
//   FETCH_USER_DATA_FAILURE,
// } from "../actions/useractions.js";

// const initialState = {
//   userData: null,
//   loading: false,
//   error: null,
// };
// const userInfoReducer = (state = initialState, action) => {
//   console.log(action.type, "actions");
//   switch (action.type) {
//     case FETCH_USER_DATA_REQUEST:
//       return { ...state, loading: true, error: null };
//     case FETCH_USER_DATA_SUCCESS:
//       return {
//         ...state,
//         userData: action.payload,
//       };
//     case FETCH_USER_DATA_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default userInfoReducer;
