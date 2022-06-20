import { useEffect, useState } from "react";

const usePostFetch = (url, fetchBody) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let abortController = new AbortController();
        fetch(url, {
            method: "POST" ,
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody),
            signal: abortController.signal,
        })
        .then(res => {
            if(!res.ok){
                throw Error("Error posting to server");
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log("fetch aborted");
            }
            setIsPending(false);
            setError(err.message);
        });

        return () => abortController.abort();

    }, [url, fetchBody]);

    return { data, isPending, error };
}

export default usePostFetch