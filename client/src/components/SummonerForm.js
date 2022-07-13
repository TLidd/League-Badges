import {useRef, useState} from "react";
import {Navigate} from "react-router-dom"
import "../Stylesheets/SummonerForm.css"
import NoSummoner from "./NoSummoner";
import usePostFetch from "./usePostFetch";

const SummonerForm = () => {
    //useRef allows for a ref object of the form value below
    const textInput = useRef(null);

    const [formName, setFormName] = useState(null);

    const {data, isPending} = usePostFetch("/summonerGame", formName);

    const formSubmit = (e) => {
        e.preventDefault();
        if(textInput.current.value !== ""){
            let name = {user: textInput.current.value};
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
            {data && data?.gameId && !isPending && <Navigate to={`./${formName.user}/ActiveGame`} />}
            {data && !data?.gameId && !isPending && <NoSummoner summonerName={formName}/>}
        </div>
    )
}

export default SummonerForm;
