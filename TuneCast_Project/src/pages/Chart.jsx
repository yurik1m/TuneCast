import '../styles/App.css'
import '../styles/index.css'
import '../styles/Playlist.css'
import { createGlobalStyle, styled } from 'styled-components';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { fetchColors } from '../styles/gradient.js';
import { useEffect, useState } from 'react';

import { Header, Footer } from "../components"

function checkIsEmpty(values) {
    return values.every(val => val == 0);
}

function getMax(playlists) {
    const playlist_entries = Object.entries(playlists);
    const playlist_values = Object.values(playlists);

    const playlist_sum = playlist_values.reduce((a, b) => a + b, 0);
    const [maxKey, maxValue] = playlist_entries.reduce((acc, val) => (val[1] > acc[1] ? val : acc));

    // const max_value = Math.max(...playlist_values);
    const max_percent = (maxValue / playlist_sum * 100).toFixed(0);

    console.log(max_percent);

    return [maxKey, max_percent];
}

function getGradient(ctx, chartArea) {

    let width, height, gradient1, gradient2, gradient3, gradient4, gradient5;

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    const colors = fetchColors();
    const [clear, clouds, fog, rain, snow] = colors;

    if (!gradient1 || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient1 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient1.addColorStop(0, clear[0]);
        gradient1.addColorStop(1, clear[1]);

        gradient2 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient2.addColorStop(0, clouds[0]);
        gradient2.addColorStop(1, clouds[1]);

        gradient3 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient3.addColorStop(0, fog[0]);
        gradient3.addColorStop(1, fog[1]);

        gradient4 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient4.addColorStop(0, rain[0]);
        gradient4.addColorStop(1, rain[1]);

        gradient5 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient5.addColorStop(0, snow[0]);
        gradient5.addColorStop(1, snow[1]);
    }

    return [gradient1, gradient2, gradient3, gradient4, gradient5];
}

function ChartView() {

    const [song, setSong] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [isEmpty, setisEmpty] = useState([false, false]);
    const [maxKey, setMaxKey] = useState(["", ""]);

    const initialState = {
        "맑음": 0,
        "구름": 0,
        "안개": 0,
        "비": 0,
        "눈": 0
    };

    if (localStorage.getItem("song") === null) {
        localStorage.setItem("song", JSON.stringify(initialState));
    }
    if (localStorage.getItem("playlist") === null) {
        localStorage.setItem("playlist", JSON.stringify(initialState));
    }

    useEffect(() => {
        const song_raw = localStorage.getItem("song");
        const song_dataset = song_raw ? JSON.parse(song_raw) : {};

        const playlist_raw = localStorage.getItem("playlist");
        const playlist_dataset = playlist_raw ? JSON.parse(playlist_raw) : {};

        setSong(song_dataset);
        setPlaylist(playlist_dataset);

        console.log(song_dataset);
    }, []);

    useEffect(() => {
        setisEmpty([checkIsEmpty(Object.values(song)), checkIsEmpty(Object.values(playlist))]);
        if (Object.keys(playlist).length > 0) {
            setMaxKey(getMax(playlist));
        } else {
            setMaxKey([]);
        }
        console.log(isEmpty);
        console.log(maxKey);
    }, [song, playlist]);

    const song_options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0)',
                },
                ticks: { color: 'black', beginAtZero: true }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0)',
                },
                ticks: { color: 'rgba(255, 255, 255, 0)', beginAtZero: true }
            },
        },
        plugins: {
            legend: {
                display: false,
            }
        }
    };
    const playlist_options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    const labels = ['맑음', '구름', '안개', '비', '눈']

    const song_data = {
        labels: labels,
        datasets: [
            {
                label: '이달의 좋아요한 음악',
                data: Object.values(song),
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
            },
        ]
    };

    const playlist_data = {
        labels: labels,
        datasets: [
            {
                label: '이달의 좋아요한 플레이리스트',
                data: Object.values(playlist),
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 0.5,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
            },
        ]
    };

    return (<>
        <Header />
        <Background>
            <Container>
                <MainContainer>
                    {isEmpty[0] ? <EmptyText>아직 좋아요한 음악이 없어요.</EmptyText> :
                        <ChartContainer>
                            <Text>이달의 좋아요한 음악</Text>
                            <Bar data={song_data} options={song_options} />
                        </ChartContainer>
                    }
                    <Vline />
                    {isEmpty[1] ? <EmptyText>아직 좋아요한 음악이 없어요.</EmptyText> :
                        <ChartContainer>
                            <Text>이달의 좋아요한 플레이리스트</Text>
                            <VStack>
                                <ChartText>{maxKey[0]}</ChartText>
                                <ChartText2>{maxKey[1]}%</ChartText2>
                                <Doughnut data={playlist_data} options={playlist_options} />
                            </VStack>
                        </ChartContainer>
                    }
                </MainContainer>
            </Container>
        </Background>
        <Footer />
    </>
    )
}
export default ChartView;

const Background = styled.div`
    width: 100vw;
    height: 80vh;

    margin: 0;
    padding: 0;

    position: relative;
`



const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 120px 0 50px 0;
`

const MainContainer = styled.div`
    height: 640px;
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.2);

    margin: 35px 0;
`
const VStack = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 400px;
    height: 450px;

    padding: 0 0 50px 0;
`
const Text = styled.p`
    position: relative;
    width: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    padding: 0 0 50px 20px;
`

const EmptyText = styled.p`
    width: 50%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    padding: 0 0 50px 20px;
    align-self: center;
    text-align: center;
`

const ChartContainer = styled.div`
    height: 640px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 100px 100px;
`
const ChartText = styled.p`
    position: relative;
    top: 55%;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
`
const ChartText2 = styled.p`
    position: relative;
    top: 58%;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
`

const Vline = styled.p`
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    height: 70%;
`