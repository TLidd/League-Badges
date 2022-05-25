const SummonerForm = () => {
  return (
    <div>
        <form>
            <div>
                <label for="summonerName">
                    Summoner Name:
                </label>
            </div>
            <div>
                <input type="text" id="summonerName"></input>
            </div>
            <div>
                <input type="submit" value="Find Summoner"></input>
            </div>
        </form>
    </div>
  )
}

export default SummonerForm;
