import {useEffect, useRef, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import SummonerLobby from "./SummonerLobby"

const SummonerForm = () => {
    //useRef allows for a ref object of the form value below
    const textInput = useRef(null);
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        navigate(`${textInput.current.value}/ActiveGame`);
    }
    
    return (
      <div>
          <form onSubmit={formSubmit}>
              <div>
                  <label htmlFor="summonerName">Summoner Name:</label>
              </div>
              <div>
                  <input type="text" id="summonerName" ref={textInput}></input>
              </div>
              <div>
                  <input type="submit" value="Find Summoner"></input>
              </div>
          </form>
      </div>
    )
}

export default SummonerForm;
