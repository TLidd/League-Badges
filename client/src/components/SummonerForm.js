import { useState } from "react";

const SummonerForm = () => {

    const [summoner, setSummoner] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();

        fetch("/summonerPost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: summoner}),
        })
        .then(res => res.json())
        .then(res => console.log(res.message));
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
    </div>
  )
}

export default SummonerForm;
