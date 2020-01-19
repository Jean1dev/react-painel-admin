import React from 'react'
import GoogleMapReact from 'google-map-react'
import Spinner from 'react-bootstrap/Spinner'
import Mark from './Mark'
import api from '../../service/api'

export default function Maps() {
    const [geoLocation, setGeolocation] = React.useState(null)
    const zoom = 15

    navigator.geolocation.getCurrentPosition(location => {
        setGeolocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
        api.post('/register/user/insert-address', {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    })

    return (
        <>
            {!geoLocation && <Spinner animation="border" />}
            {geoLocation &&
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBDlUDBzISzv_aNhek9qQ31oN2o5u8Tw_s' }}
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
