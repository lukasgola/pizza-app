import React, {useState} from 'react';
import { Text, View, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';


import pizza from '../../data/pizza';


function OrderHalf ({navigation}) {

    let click = 0;
    const half1 = [];
    const half2 = [];

    function addPizza(name,size,price){
        navigation.state.params.addPizza(name,size,price)
    }

    function addHalf(half1,half2,name,size,price){
        if(click==0){
            half1[0]=name;
            half1[1]=size;
            half1[2]=price;
            click++;
        }
        else if(click==1){
            half2[0]=name;
            half2[1]=size;
            half2[2]=price;
            if(half1.price>half2.price){
                navigation.state.params.addPizza(half1[0]+' '+half2[0],size,half1[2])
                navigation.navigate('AddNotes')
            }
            else{
                navigation.state.params.addPizza(half1[0]+', '+half2[0],size,half2[2])
                navigation.navigate('AddNotes')
            }
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.menuIconView}
                    onPress={() => navigation.navigate('AddNotes')}
                >
                    <Image style={{
                        width: 40,
                        height: 40,
                        tintColor: 'black',
                    }} source={require('../../assets/icons/back.png')} />
                </TouchableOpacity>
                <Text style={{
                    color: 'black',
                    fontSize: 26,
                }}>PIZZA</Text>
                <View
                    style={styles.menuIconView}
                >
                </View>
            </View>

            <FlatList 
                data={pizza}
                renderItem={({item}) => 
                    <View style={styles.listElement}>
                        <View style={styles.pizzaNumber}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 20,
                                }}
                            >
                                {item.id}
                            </Text>
                        </View>
                        <View style={styles.main}>
                                <View style={styles.foodName}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 18,
                                            marginLeft: 20,
                                            textTransform: 'uppercase',
                                        }}
                                    >{item.name}</Text>
                                </View>
                                <View style={styles.foodPrice}>
                                    <TouchableOpacity 
                                        style={styles.foodsmall}
                                        onPress={() => {
                                            addHalf(half1,half2,item.name,'mała',item.small)
                                        }}
                                    >
                                        <Text
                                            style={styles.priceText}
                                        >{item.small}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.foodbig}
                                        onPress={() => {
                                            addHalf(half1,half2,item.name,'duża',item.big)
                                        }}
                                    >
                                        <Text
                                            style={styles.priceText}
                                        >{item.big}</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                }
                style={{
                    marginBottom: 20,
                }}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
            
        </View>
        
    )
}

export default OrderHalf;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        marginTop: '6%',
    },

    menu: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    menuIconView: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listElement: {
        width: '90%',
        height: 80,
        backgroundColor: '#DDD',
        borderRadius: 20,
        marginLeft: '5%',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    pizzaNumber: {
        width: '15%',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '2.5%',
        backgroundColor: 'white',
    },

    main: {
        width: '80%',
        height: '100%',
        borderRadius: 20,
    },

    foodName: {
        width: '100%',
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
    },

    foodPrice: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
    },

    foodsmall: {
        width: '45%',
        height: '80%',
        backgroundColor: '#219653',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderRightWidth: 1,
        borderRightColor: 'white',
    },

    foodbig: {
        width: '45%',
        height: '80%',
        backgroundColor: '#bf3232',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },

    priceText: {
        color: 'white',
        fontSize: 18,
    },
})
