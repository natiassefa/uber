import { SafeAreaView, StyleSheet, Text, View , Image, ScrollView} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY } from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style= {tw`p-5`}>
        <Image 
            style ={{
                width: 100,
                height: 100,
                resizeMode: "contain"
            }}
            source={{
                uri: "https://links.papareact.com/gzs"
            }}
        />
        <View>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder='Where From?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize:18
            }
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
            }))

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
        />
          
        </View>
        <NavOptions/>
        <NavFavourites/>
      </View>
      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }
});