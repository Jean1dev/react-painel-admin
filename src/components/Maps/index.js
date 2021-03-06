import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Spinner from 'react-bootstrap/Spinner'
import Mark from './Mark'
import api from '../../service/api'

function updateUserWithLocation(stateLocation, newLocation) {
    if (!stateLocation) {
        api.post('/register/user/insert-address', {
            lat: newLocation.coords.latitude,
            lng: newLocation.coords.longitude
        })
    }
}

export default function Maps() {
    const [geoLocation, setGeolocation] = React.useState(null)
    const zoom = 15

    useEffect(() => {
        function getLocation() {
            navigator.geolocation.getCurrentPosition(location => {
                updateUserWithLocation(geoLocation, location)
                setGeolocation({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                })
            })
        }

        getLocation()
    }, [geoLocation])

    return (
        <>
            {!geoLocation && <Spinner animation="border" />}
            {geoLocation &&
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
                        defaultCenter={geoLocation}
                        defaultZoom={zoom}
                    >
                        <Mark
                            lat={geoLocation.lat}
                            lng={geoLocation.lng}
                            text={""}
                        />
                    </GoogleMapReact>
                </div>
            }
        </>
    )
}
