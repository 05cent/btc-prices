import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getPrices } from '../store/slices/pricesStore.ts';
import { RootState } from '../types/PricesStore.ts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

const BtcPricesChart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { prices, loading, timeStamp } = useSelector((state: RootState) => state.prices);

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
                            beginAtZero: true,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: (data: any) => `${data[0].dataset.curr}-${data[0].formattedValue}`,
                                label: () => ''
                            },
                            titleMarginBottom: 0,
                            titleFont: {
                                size: 20
                            },
                            footerFont: {
                                size: 10
                            },
                            padding: {
                                left: 20,
                                top: 10,
                                bottom: 10,
                                right: 20
                            },
                            titleColor: '#536fcb',
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: 'rgba(128,128,128,0.2)',
                            cornerRadius: 10,
                            caretSize: 0
                        }
                    }
                }}
                height={400}
                width={1000}
                data={{
                    labels: timeStamp,
                    datasets: Object.keys(prices || {}).map((price: any) => ({
                        curr: price,
                        data: [...new Set(prices?.[price] ?? [])],
                        borderColor: '#65bd08',
                        borderWidth: 1,
                        pointBorderColor: '#4ae117',
                        pointBorderWidth: 2,
                        pointRadius: 3
                    }))
                }}
            />
    );
};

export default BtcPricesChart;