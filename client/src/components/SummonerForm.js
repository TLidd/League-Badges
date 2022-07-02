import {useRef} from "react";
import {useNavigate} from "react-router-dom"
import "../Stylesheets/SummonerForm.css"

const SummonerForm = () => {
    //useRef allows for a ref object of the form value below
    const textInput = useRef(null);
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        navigate(`${textInput.current.value}/ActiveGame`);
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
        </div>
    )
}

export default SummonerForm;
