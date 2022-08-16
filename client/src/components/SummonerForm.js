import {useRef, useState} from "react";
import {Navigate} from "react-router-dom"
import "../Stylesheets/SummonerForm.css"
import CheckSummoner from "./CheckSummoner";
import useGetFetch from "./useGetFetch";

const SummonerForm = () => {
    //useRef allows for a ref object of the form value below
    const textInput = useRef(null);

    //the form input name the user types in (-1 is just a placeholder for a name for the first hook)
    const [formName, setFormName] = useState("-1");

    const {data, isPending, error} = useGetFetch(`/summonerGame/${formName}`);

    const formSubmit = (e) => {
        e.preventDefault();
        if(textInput.current.value !== ""){
            let name = textInput.current.value;
            setFormName(name);
        }
        textInput.current.value = "";
    }
    
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
            {isPending && <img className="loadingGif" src={require("../assets/loading.gif")} alt="loading..."/>}
            {data && data?.gameId && !isPending && <Navigate to={`./${formName}/ActiveGame`} />}
            {/* if summoner doesn't exist or not in game CheckSummoner */}
            {error && formName && !isPending && <CheckSummoner formName={formName} data={error}/>}
        </div>
    )
}

export default SummonerForm;
