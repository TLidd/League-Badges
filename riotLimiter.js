import fetch from "node-fetch";
import Bottleneck from "bottleneck";

export default class riotLimiter{
    #limiterMaxCalls;
    #callsPerSecond;
    #maxCallsTimeSeconds;

    currentFetchCalls = 0;

    startAPITime;

    limiter = new Bottleneck({
        reservoir: 20, // initial value
        reservoirRefreshAmount: 20,
        reservoirRefreshInterval: 1.25 * (1000), // must be divisible by 250
        maxConcurrent: 20,
        minTime: 55,
    })

    constructor(limiterMaxCalls = 100, maxCallsTimeSeconds = 120, callsPerSecond = 20){
        this.#limiterMaxCalls = limiterMaxCalls;
        this.#callsPerSecond = callsPerSecond;
        this.#maxCallsTimeSeconds = maxCallsTimeSeconds;
    }

    async getFetchData(fetchURL){
        if(this.currentFetchCalls == 0){
            this.#setTimer();
        }

        this.currentFetchCalls += 1;

        if(this.currentFetchCalls > this.#limiterMaxCalls){
            await this.#delay(this.#getTimeLeft(timer));
        }

        let res = await this.limiter.schedule(() => {
            return fetch(fetchURL);
        });

        if(this.currentFetchCalls == 1){
            this.#setRateLimits(res.headers.get('X-App-Rate-Limit'));
        }

        let data;
        if(res){
            data = await res.json();
        }
        return data;
    }

    #setTimer(){
        this.startAPITime = Date.now();
        setTimeout(() => {
            this.currentFetchCalls = 0;
        }, (this.#maxCallsTimeSeconds * 1000) + 5000)
    }

    #getTimeLeft(timeout) {
        return Math.ceil((125000 - (Date.now() - initialTime)) / 1000);
    }

    #delay(seconds){
        return new Promise(resolve => setTimeout(resolve, seconds * 1000))
    }

    #setRateLimits(rateString){
        let rates = rateString.split(',');
        let rate1 = rates[0].split(':');
        let rate2 = rates[1].split(':');
        this.#callsPerSecond = rate1[0];
        this.#maxCallsTimeSeconds = rate2[1];
        this.#limiterMaxCalls = rate2[0];
    }

}