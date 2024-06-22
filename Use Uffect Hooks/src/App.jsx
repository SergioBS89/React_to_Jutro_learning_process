import { useCallback, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'
import { useEffect } from 'react';

//It gets from local storage, those places stored there
const listSelectedPlaces = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = listSelectedPlaces
  .map((id) => AVAILABLE_PLACES.find((place) => place.id === id))

function App() {

  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * The useEffect hook in React is used to handle side effects in functional components, such as data fetching, subscriptions, and DOM manipulations. 
   * It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount. 
   * The hook takes a function that can return a cleanup function and an optional dependencies array. 
   * The dependencies array controls when the effect runs: empty [] runs once, specified dependencies [dep1, dep2] run on their changes, and no array runs on every render.
   * Common uses include fetching data, setting up event listeners, and updating the DOM. Always specify dependencies correctly to avoid unwanted re-runs and
   * ensure proper resource cleanup.
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((myPosition) => {
      const sortedPlacesByMyPosition = sortPlacesByDistance(AVAILABLE_PLACES, myPosition.coords.latitude, myPosition.coords.longitude);
      setAvailablePlaces(sortedPlacesByMyPosition);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setIsModalOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    //Add into local storage the picked place
    const listSelectedPlaces = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (!listSelectedPlaces.includes(id)) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...listSelectedPlaces]));
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {

    setPickedPlaces((prevPickedPlaces) => {
      return prevPickedPlaces.filter((place) => place.id !== selectedPlace.current);
    });

    setIsModalOpen(false);

    //It removes the place in local storage 
    const listSelectedPlaces = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const updatedSelectedPlaces = listSelectedPlaces.filter((id) => id !== selectedPlace.current);
    localStorage.setItem('selectedPlaces', JSON.stringify(updatedSelectedPlaces));
  }, [])


  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        {/* To implement the counter to close modal, we must wrap this component, and it will be execute only when the modal is open */}
        {isModalOpen && <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />}
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
