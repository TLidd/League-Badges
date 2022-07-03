import {useEffect, useRef, useState} from "react";
import {Navigate} from "react-router-dom"
import "../Stylesheets/SummonerForm.css"

const SummonerForm = () => {
    //useRef allows for a ref object of the form value below
    const textInput = useRef(null);

    let [formInput, setFormName] = useState(null);
    let [summonerName, setName] = useState(null);
    let [summonerExists, setExists] = useState(true);
    let [inGameData, setInGameData] = useState(null);
    let [inGame, setInGame] = useState(true);
    let [isLoading, setLoading] = useState(null);

    const formSubmit = (e) => {
        e.preventDefault();
        setFormName(textInput.current.value);
        setExists(true);
        textInput.current.value = "";
    }

    useEffect(() => {
        let abortController = new AbortController();
        if(formInput !== null && formInput !== ""){
            setLoading(true);
            fetch("summonerPost", {
                method: 'POST',
                body: JSON.stringify({user: formInput}),
                headers: { 'Content-Type': 'application/json' },
                signal: abortController.signal
            })
            .then(res => {
                if(!res.ok){
                    throw Error("Error posting to server");
                }
                return res.json();
            })
            .then(data => {
                if(data?.name){
                    setName(data.name);
                    setExists(true);
                }
                if(data?.name === undefined){
                    setExists(false);
                    setLoading(false);
                }
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log("fetch aborted");
                }
            });
        }

        return () => abortController.abort();
    }, [formInput]);

    useEffect(() => {
        let abortController = new AbortController();
        if(summonerName != null){
            fetch("summonerGame", {
                method: 'POST',
                body: JSON.stringify({user: summonerName}),
                headers: { 'Content-Type': 'application/json' },
                signal: abortController.signal
            })
            .then(res => {
                if(!res.ok){
                    throw Error("Error posting to server");
                }
                return res.json();
            })
            .then(data => {
                setLoading(false);
                if(!data?.status){
                    setInGameData(data)
                }else{
                    setInGame(false);
                }
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log("fetch aborted");
                }
            });
        }

        return () => abortController.abort();
    }, [summonerName])
    
    return (
        <div className="form-center">
            <form onSubmit={formSubmit}>
                <div className="text">
                    <label htmlFor="summonerName">Summoner Name:</label>
                </div>
                <div>
                    <input className="textInput" maxLength={16} type="text" id="summonerName" ref={textInput}></input>
                </div>
                <div>
                    <input className="button" type="submit" value="Find Summoner"></input>
                </div>
            </form>
            {!summonerExists && 
                <div className="noSummoner">
                    {`${formInput} does not exist`}
                </div>
            }
            {isLoading && 
                <img src={require("../assets/loading.gif")} alt="loading..." className="loadingGif"/>
            }
            {summonerExists && inGameData && <Navigate to={`/${summonerName}/ActiveGame/`} state={{inGameData}} />}
            {summonerExists && !inGame && <Navigate to={`/${summonerName}`} />}
        </div>
    )
}

export default SummonerForm;
