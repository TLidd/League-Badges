import { useEffect, useState } from "react";

const usePostFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let abortController = new AbortController();
        setIsPending(true);
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error("Error getting data from server");
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

    }, [url]);

    return { data, isPending, error };
}

export default usePostFetch