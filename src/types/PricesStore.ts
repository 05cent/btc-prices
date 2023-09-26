export type Prices = {
    prices: any[];
    timeStamp: string[];
    loading: boolean
}

export type RootState = {
    prices: Prices
}