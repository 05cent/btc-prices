import axios from 'axios';

const baseURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export const fetchPrices = async () => {
    try {
        const res = await axios(baseURL);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
