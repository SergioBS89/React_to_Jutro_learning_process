import { useEffect, useState } from "react";

/**
 * The convention name for custom hooks should start with use + OurHookName
 */
export function useFetch(fetchFnc, initialValue){
    //States to manage fetching
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, seFetchedtData] = useState(initialValue);
    useEffect(() => {
        async function fetchData() {
          setIsFetching(true)
          try {
            const data = await fetchFnc() //function of parameter
            seFetchedtData(data);
          } catch (error) {
            setError({ message: error.message || 'Something was wrong fetching data...' })
          }
          setIsFetching(false)
        }
        //We must call the function out side useEffect
        fetchData();
      }, [fetchFnc])

      //we must return the tree states
      return {
        isFetching,
        error,
        fetchedData,
        seFetchedtData //we can expose setters to manage the state in others places
      }
}