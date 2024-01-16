import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/base';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`bg-white pb-12 -mt-11 `}>
            <View style={tw` flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={toInputBoxStyles}
                        placeholder='Where To?'
                        debounce={400}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en',
                        }}
                        minLength={2}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => {

                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            navigation.navigate('RideOptionsCard')
                        }}
                    />
                </View>
                <NavFavourites/>

            </View>
            <View style={tw`flex-row justify-center `}>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("RideOptionsCard")}
                    style={tw`m-2 flex-row bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon 
                        name="car"
                        type="font-awesome"
                        color='white'
                        size={16}
                    />
                    <Text style={tw`text-white text-center pl-4 pr-3 `}>Rides  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`m-2 flex flex-row bg-black justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon 
                        name="fast-food-outline"
                        type="ionicon"
                        color='white'
                        size={16}
                    />
                    <Text style={tw`text-white text-center pl-4 pr-2`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})