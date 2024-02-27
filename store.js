 

import { configureStore } from "@reduxjs/toolkit";

import blindsReducer from "./blindsSlice";

export default configureStore
({
    reducer: {
    blinds: blindsReducer
    },
})
