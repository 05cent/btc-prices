import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Prices } from '../../types/PricesStore.ts';
import { fetchPrices } from '../../api';
import store from '../store.ts';

const initialState: Prices = {
    prices: [],
    loading: false,
    timeStamp: []
};

export const getPrices = createAsyncThunk('prices/getPrices', () => fetchPrices());

const makeLocaleString = (time: string) => new Date(time.replace(' at ', ' ').replace(' BST', '')).toLocaleString(
    'en-US',
    {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

const pricesStore = createSlice({
    name: 'prices',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPrices.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPrices.fulfilled, (state, action) => {
                state.loading = false;
                state.prices = Object.values(action.payload.bpi);
                state.timeStamp = Object.values(action.payload.time).map(t => makeLocaleString(t as string));
            });
    }
});

export type AppDispatch = typeof store.dispatch
export default pricesStore.reducer;
