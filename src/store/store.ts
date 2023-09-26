import { configureStore } from "@reduxjs/toolkit";
import { prices } from "./slices";

const pricesStore = configureStore({
    reducer: {
        prices
    }
});

export default pricesStore;