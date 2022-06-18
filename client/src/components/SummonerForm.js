import {useEffect, useRef, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import SummonerLobby from "./SummonerLobby"

const SummonerForm = () => {

    const [lobby, setLobby] = useState(null);
    const [sumName, setSummoner] = useState('');

    //useRef allows for a ref object of the form value below
    const textInput = useRef(null);
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        navigate(`${textInput.current.value}/ActiveGame`);
      }
    
    // useEffect(() => {
    //   console.log(sumName);
    //   if(sumName !== undefined){
    //     fetch("/summonerGame", {
    //       method: "POST" ,
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({user: sumName}),
    //     })
    //     .then(res => {
    //       if(!res.ok){
    //       throw Error("Error posting to server");
    //       }
    //       return res.json();
    //     })
    //     .then(data => {
    //       if('status' in data){
    //         if(data.status.status_code === 404){
    //           throw Error("No data found");
    //         }
    //         if(data.status.status_code === 429){
    //           throw Error("Api limit reached");
    //         }
    //       }
    //       else{
    //         setLobby(data);
    //       }
    //     })
    //     .catch(err => {
    //           console.log(err.message);
    //     })
    //   }
    // }, [sumName])

    
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
          {/* <Routes>
              <Route exact path="/" element={(sumName && !lobby) ? <Navigate to={`/${sumName}`}/> : ''}/>
              <Route exact path={`./${sumName}/ActiveGame`} element={<SummonerLobby lobbyList={lobby}/>} />
          </Routes> */}

      </div>
    )
}

export default SummonerForm;
