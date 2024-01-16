import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
const data = [
    {
        id: "Uber-X",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL",
        title: "UberXL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-Black",
        title: "Uber Black",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    },
]

const SURGE_PRICE = 1.5;
const RideOptionsCard = () => {
    const navigation = useNavigation();
    const travelTimeInfo = useSelector(selectTravelTimeInformation)
    const [selected, setSelected] = useState(null);
    return (
        <SafeAreaView style={tw`bg-white flex-grow -mt-12 `}>
            <View style={tw`-mt-5 pb-2`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInfo?.distance.text}</Text>

            </View>


                <FlatList
                    style={tw`-mt-5`}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item: { id, title, image, multiplier }, item }) => (
                        <TouchableOpacity
                            style={tw`flex-row  justify-between items-center px-10 ${id === selected?.id && "bg-gray-100"}`}
                            onPress={() => setSelected(item)}
                        >

                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: "contain"
                                }}
                                source={{ uri: image }}
                            />
                            <View style={tw`-ml-6`}>
                                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                                <Text style={tw`text-center`}>{travelTimeInfo?.duration.text}</Text>
                            </View>
                            <Text style={tw`text-xl`}> 
                                {new Intl.NumberFormat('en-gb', {
                                    style:'currency',
                                    currency: 'USD'
                                }).format(
                                    (travelTimeInfo?.duration.value *SURGE_PRICE *multiplier )/100
                                )}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                    disabled={!selected} 
                    style={tw`items-center py-3 bg-black mt-2 ml-5 mr-5 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-white`}>Choose {selected ? 
                            (<Text style={tw`font-semibold`}>{selected.title}</Text> )
                            : <Text style={tw`font-semibold`}>A car</Text>}</Text>
                </TouchableOpacity>
                </View>


  


        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})