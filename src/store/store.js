import { configureStore } from "@reduxjs/toolkit";
import { prices } from "./slices/index.js";

const pricesStore = configureStore({
    reducer: {
        prices
    }
});

export default pricesStore;