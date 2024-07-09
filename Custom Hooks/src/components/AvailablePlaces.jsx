import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../helper.js'
import { useFetch } from '../custom_hooks/useFetch.js';

/**
 * 
 * @returns Creating a promise to sort places when we are working with a custom hook
 */
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let listOfPlacesSorted = sortPlacesByDistance(places, position.coords.latitude, position.coords.altitude);

      resolve(listOfPlacesSorted);
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {

  const {
    isFetching: fetching,
    error,
    fetchedData: availablePlaces
  } = useFetch(fetchSortedPlaces, [])

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
