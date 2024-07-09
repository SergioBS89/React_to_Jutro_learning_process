import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../helper.js'

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);
  //A way to manage the fetching time and display a message in the app can be done like (sometimes it could be more than 2 seconds to retrieve the data)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState();


  //Option A to fetch data from a back end service
  useEffect(() => {
    async function fetchPlaces() {
      //set the status hook for fetching time
      setFetching(true)
      try {

        const places = await fetchAvailablePlaces();

        await navigator.geolocation.getCurrentPosition((position) => {
          let listOfPlacesSorted = sortPlacesByDistance(places, position.coords.latitude, position.coords.altitude);
          setAvailablePlaces(listOfPlacesSorted);
          //time over for fetching
          setFetching(false);
        })

      } catch (error) {
        setError({
          //Customaze the mesage for the exception message if there is an error fetching
          message: error.message || 'Impossible to fetch the places. Try later..'
        });
        //time over for fetching
        setFetching(false)
      }
    }

    fetchPlaces();
  }, [])

  //Option B to fetch data from a back end service
  /*   useEffect(() => {
      fetch('http://localhost:3000/places').then((response) => {
        return response.json()
      }).then((resData) => {
        setAvailablePlaces(resData.places);
      });
    }, []); */

  if (error) {
    return <Error title="An error ocurred!.." message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={fetching}
      loadingFetchPlaces="Fetching places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
