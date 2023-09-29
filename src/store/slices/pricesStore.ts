import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Prices } from '../../types/PricesStore.ts';
import { fetchPrices } from '../../api';
import store from '../store.ts';

const initialState: Prices = {
    prices: null,
    loading: false,
    timeStamp: []
};

export const getPrices = createAsyncThunk('prices/getPrices', () => fetchPrices());

const makeLocaleString = (time: string) => new Date(time.replace(' at ', ' ')
    .replace(' BST', '')).toLocaleString(
    'en-US',
    {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });

function transformObject(input: any, state: any) {
    const result: any = { ...(state || {}) };
    for (const currencyCode in input) {
        const { rate_float } = input[currencyCode];
        result[currencyCode] ? result[currencyCode].push(rate_float) : result[currencyCode] = [rate_float];
        if (result[currencyCode].length > 50) {
            result[currencyCode].splice(Math.floor(result[currencyCode].length / 2) - 2, 3);
        }
    }

    return result;
}

const pricesStore = createSlice({
    name: 'prices',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPrices.pending, (state) => {
                state.loading = true;
                if (state.timeStamp.length > 50) state.timeStamp.splice(Math.floor(state.timeStamp.length / 2) - 2, 3);
            })
            .addCase(getPrices.fulfilled, (state, action) => {
                state.loading = false;
                state.prices = transformObject(action.payload.bpi, state.prices);
                state.timeStamp = [...new Set([...state.timeStamp, ...Object.values(action.payload.time)
                    .map(t => makeLocaleString(t as string))])].sort((a: string, b: string) => new Date(a).getTime() -
                    new Date(b).getTime());
            });
    }
});

export type AppDispatch = typeof store.dispatch
export default pricesStore.reducer;
