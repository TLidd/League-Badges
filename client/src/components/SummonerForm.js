import { useState } from "react";

const SummonerForm = () => {

    const [sumName, setSummoner] = useState('');
    const [sumInfo, setSumInfo] = useState({});

    const formSubmit = (e) => {
        e.preventDefault();

        fetch("/summonerPost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: sumName}),
        })
        .then(res => res.json())
        .then(infoJson => {
            setSumInfo({name: infoJson.name, sumLvl: infoJson.summonerLevel});
            console.log(sumInfo.name);
        });
    }

  return (
    <div>
        <form onSubmit={formSubmit}>
            <div>
                <label htmlFor="summonerName">Summoner Name:</label>
            </div>
            <div>
                <input onChange={(e) => setSummoner(e.target.value)} type="text" id="summonerName"></input>
            </div>
            <div>
                <input type="submit" value="Find Summoner"></input>
            </div>
        </form>
        <div>
            <p>{sumInfo.name ? sumInfo.name : ''}</p>
            <p>{sumInfo.sumLvl ? sumInfo.sumLvl : ''}</p>
        </div>
    </div>
  )
}

export default SummonerForm;
