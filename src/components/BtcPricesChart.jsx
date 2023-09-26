import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrices } from '../store/slices/pricesStore.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

const BtcPricesChart = () => {
    const dispatch = useDispatch();
    const { prices, loading } = useSelector((state) => state.prices);
    
    useEffect(() => {
        dispatch(getPrices());
        const intervalId = setInterval(() => {
            dispatch(getPrices());
        }, 15000);
        return () => clearInterval(intervalId);
    }, []);
    
    return (loading ? <>Loading</> :
            <Line
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                title: (data) => data[0].dataset.data,
                                label: () => '',
                            },
                            titleMarginBottom: 0,
                            titleFont: {
                                size: 20,
                            },
                            footerFont: {
                                size: 10,
                            },
                            padding: {
                                left: 20,
                                top: 10,
                                bottom: 10,
                                right: 20,
                            },
                            titleColor: '#536fcb',
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: 'rgba(128,128,128,0.2)',
                            cornerRadius: 10,
                            caretSize: 0,
                        },
                    },
                }}
                height={400}
                width={1000}
                data={{
                    labels: prices?.time && Object.values(prices?.time ?? {})
                        .map(t => new Date(t).toLocaleString(
                            'en-US',
                            {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })),
                    datasets: [
                        {
                            data: prices?.bpi?.USD?.rate,
                            fill: true,
                            borderColor: '#65bd08',
                            borderWidth: 1,
                            pointBorderColor: '#4ae117',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                        }, {
                            data: prices?.bpi?.EUR?.rate,
                            fill: true,
                            borderColor: '#5aab04',
                            borderWidth: 1,
                            pointBorderColor: '#2da803',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                        }, {
                            data: prices?.bpi?.GBP?.rate,
                            fill: true,
                            borderColor: '#94042a',
                            borderWidth: 1,
                            pointBorderColor: '#6e021f',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                        },
                    ],
                }}
            />
    );
};

export default BtcPricesChart;