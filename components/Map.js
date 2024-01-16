import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { setDestination, setOrigin } from '../slices/navSlice'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from "@env"
import { useState } from "react";
import MapViewDirections from "react-native-maps-directions"

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(0);
    const mapRef = useRef(null)

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        })
    }, [origin, destination])

    useEffect(() => {

        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.description}&destinations=${destination.description}
            &key=${GOOGLE_MAPS_API_KEY}`)
            .then((res) => res.json())
            .then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }

        getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_API_KEY])
    return (
        <View style={tw`flex-1`}>
            {/* <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                placeholder={origin.description}
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}
                onPress={(data, details = null) => {

                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    setRefresh(refresh + 1)
                    dispatch(setDestination(null))
                    console.log(details)
                    console.log(data)
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                }}
                minLength={2}
                enablePoweredByContainer={false}
                debounce={400}
            /> */}
            <MapView
                ref={mapRef}
                key={refresh}
                style={tw`flex-1`}
                mapType='mutedStandard'
                initialRegion={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                {origin && destination && (
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        apikey={GOOGLE_MAPS_API_KEY}
                        strokeWidth={3}
                        strokeColor='black'
                    />
                )}
                {origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        title="Current Location"
                        description={origin.description}
                        identifier='origin'
                    />
                )}
                {destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title="Destination"
                        description={destination.description}
                        identifier='destination'
                    />
                )}
            </MapView>
        </View>

    )
}

export default Map

const styles = StyleSheet.create({})