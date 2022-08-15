import * as randomColor from 'randomcolor';
import { useEffect, useState } from "react";
import RadarChart from "./RadarChart"
import "../Stylesheets/ChampionChart.css"

const ChampionChart = ({data}) => {

    const [userData, setUserData] = useState(null);

    //creating a state variable to create a custom legend that hides/unhides the data by clicking on champion icon
    const [shownChampions, setShownChampions] = useState([]);

    let champsToShow = 3;
    const [graphColors] = useState(getRandomColors(champsToShow));

    const [chartOptions] = useState({
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
                display: false, // Hides the labels in the middle (numbers)
                stepSize: 20,
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
        },
    });

    useEffect(() => {
        if(data?.SummonerName){
            let showChamps = [];
            Object.values(data.champions).slice(0,champsToShow).map(champ => {
                showChamps.push(champ.champData.champName);
            })
            setShownChampions(showChamps);
        }
    }, [data])

    useEffect(() => {
        console.log(shownChampions);
        if(data?.SummonerName){
            setUserData({
                labels: Object.keys(Object.values(data.champions)[0].champData.champStats),
                datasets: Object.values(data.champions).slice(0,champsToShow).map((champ, index) => {
                    let champion = {
                        label: champ.champData.champName,
                        data: Object.values(champ.champData.champStats),
                        borderColor: 'black',
                        backgroundColor: graphColors[index],
                        borderWidth: 2,
                        hidden: shownChampions.includes(champ.champData.champName) ? false : true,
                    }

                    index++;
                    return champion;
                })
            })
        }
      }, [data, shownChampions])

      let championClicked = (e) => {
        let newChampsShow = [...shownChampions];
        if(shownChampions.includes(e.target.name)){
            let index = newChampsShow.indexOf(e.target.name);
            newChampsShow.splice(index, 1);
        }
        else{
            newChampsShow.push(e.target.name);
        }
        setShownChampions(newChampsShow);
      }

    return (
        <>
            {
            userData && 
            <div className='championChart'> <RadarChart chartData={userData} options={chartOptions} /> </div>
            }
            <div className='championLegend'>
                {
                    Object.values(data.champions).slice(0,champsToShow).map((champ, index) => {
                        return <img className='championIcon' key={champ.champData.champName} 
                        style={{border: shownChampions.includes(champ.champData.champName) ? '4px solid ' + graphColors[index] : '4px solid #FFFFFF00'}} 
                        src={require(`../assets/tiles/${champ.champData.champName}_0.jpg`)}
                        name={champ.champData.champName} alt={champ.champData.champName}
                        onClick={championClicked}/>
                    })
                }
            </div>
        </>
    )
}

const getRandomColors = (count) => {
    let availableColors = ['red', 'yellow', 'purple', '#00FFFF'];
    let colors = [];
    for(let i = 0; i < count; i++){
        let color = randomColor({hue: availableColors[i], luminosity: 'dark'});
        colors.push(color.concat('99'));
    }
    return colors;
}

export default ChampionChart