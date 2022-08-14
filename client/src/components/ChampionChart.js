import * as randomColor from 'randomcolor';
import { useEffect, useState } from "react";
import RadarChart from "./RadarChart"
import "../Stylesheets/ChampionChart.css"

const ChampionChart = ({data}) => {

    const [userData, setUserData] = useState(null);

    const [chartOptions] = useState({
        scales: {
          r: {
            ticks: {
              display: false, // Hides the labels in the middle (numbers)
            },
            grid: {
              color: 'aqua',
            },
            angleLines: {
              color: 'aqua'
            },
            pointLabels: {
              color:"white",
              font: {
                size: 15
              }
            },
          },
        },
        animation: false,
        plugins: {
          legend: {
            labels: {
              color: "white"
            },
            display: false
          }
        }
    });

    useEffect(() => {
        if(data?.SummonerName){
            let color = ['rgba(158, 21, 21, 0.5)', 'rgba(22, 158, 21, 0.5)', 'rgba(21, 99, 158, 0.5)'];
            let colorIndex = 0;
            setUserData({
                labels: Object.keys(Object.values(data.champions)[0].champData.champStats),
                datasets: Object.values(data.champions).map(champ => {
                    let champion = {
                        label: champ.champData.champName,
                        data: Object.values(champ.champData.champStats),
                        borderColor: 'black',
                        backgroundColor: color[colorIndex],
                        borderWidth: 2,
                    }
                    colorIndex += 1;
                    return champion;
                })
            })
        }
      }, [data])

    return (
        <>
            {
            userData && 
            <div className='championChart'> <RadarChart chartData={userData} options={chartOptions} /> </div>
            }
        </>
    )
}

export default ChampionChart