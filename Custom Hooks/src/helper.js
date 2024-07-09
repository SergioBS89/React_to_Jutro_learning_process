export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return resData.places
}

export async function fetchPickedPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch picked places');
    }

    return resData.places
}

export async function updatePickedPlace(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'put',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json()

    if (!response.ok) {
        throw new Error('Failed to update picked places')
    }

    return resData.message //This message is the response of our backend located in app.js
}