import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchPickedPlaces, updatePickedPlace } from './helper.js';
import Error from './components/Error.jsx';
import { useFetch } from './custom_hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingAlert, setErrorUpdatingAlert] = useState();

  /**
   * We use our custom hook here 
   */
  const { 
    isFetching,
    error,
    fetchedData,
    //We can customaze the name of the setter 
    seFetchedtData: setUserPlaces } = useFetch(fetchPickedPlaces, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updatePickedPlace([selectedPlace, ...fetchedData])
    }
    catch (error) {
      // If the put method fails, we keep having the state as it is (rollback)
      setUserPlaces(fetchedData);
      setErrorUpdatingAlert({ message: error.message || 'Something was wrong updating picked places...' })
    }

  }

  function handleError() {
    setErrorUpdatingAlert(null)
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    console.log(selectedPlace.current.id)


    //Deleting in back end the removed picked places
    try {
      await updatePickedPlace(
        fetchedData.filter((place) => place.id !== selectedPlace.current.id));
    } catch (error) {
      setUserPlaces(fetchedData)
      setErrorUpdatingAlert({
        message: error.message || 'Failed to delete places'
      })
    }

    setModalIsOpen(false);
  }, [fetchedData, setUserPlaces]);

  return (
    <>
      <Modal open={errorUpdatingAlert} onClose={handleError}>
        {errorUpdatingAlert && (
          <Error
            title="An error ocurred!"
            message={errorUpdatingAlert.message}
            onConfirm={handleError} />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
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
        {error && <Error title="An error ocurred!" message={error.message} />}
        {!error &&
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={fetchedData}
            onSelectPlace={handleStartRemovePlace}
            isLoading={isFetching}
            loadingFetchPlaces={"Fetching your picked places..."}
          />}
        <AvailablePlaces
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
