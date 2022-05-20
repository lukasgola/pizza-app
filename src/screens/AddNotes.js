import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput, Image, ScrollView } from 'react-native'
import { Text, IconButton, FAB } from 'react-native-paper';

function AddNotes({ navigation }) {
    const [deliveryTown, setDeliveryTown] = useState('')
    const [deliveryStreet, setDeliveryStreet] = useState('')
    const [deliveryHours, setDeliveryHours] = useState('')
    const [deliveryMin, setDeliveryMin] = useState('')

    const [pizzaName, setPizzaName] = useState([])
    const [pizzaSize, setPizzaSize] = useState([])
    const [pizzaPrice, setPizzaPrice] = useState([])

    const addPizza = (name,size,price) => {
        setPizzaName( arr => [...arr, name]);
        setPizzaSize( arr => [...arr, size]);
        setPizzaPrice( arr => [...arr, price]);
    };

    const delPizza = () => {
        setPizzaName([])
        setPizzaSize([])
        setPizzaPrice([])
        setSauceName([])
        setSaucePrice([])
    }

    const [sauceName, setSauceName] = useState([])
    const [saucePrice, setSaucePrice] = useState([])

    const addSauce = (name,price) => {
        setSauceName( arr => [...arr, name]);
        setSaucePrice( arr => [...arr, price]);
    };


    var orderHours = new Date().getHours();
    var orderMin = new Date().getMinutes();

    function onSaveNote() {
        navigation.state.params.addNote({ deliveryTown, deliveryStreet, deliveryHours, deliveryMin, pizzaName, pizzaSize, pizzaPrice, sauceName, saucePrice, suma, orderHours, orderMin })
        navigation.goBack()
    }

    let suma = 0;

    for(var i=0;i<pizzaName.length;i++){
        suma+=parseFloat(pizzaPrice[i]);
    }

    for(var i=0;i<sauceName.length;i++){
        suma+=parseFloat(saucePrice[i]);
    }

    let dostawa = 0;

    if((deliveryTown=='Szczepanek')||(deliveryTown=='Gąsiorowice')||(deliveryTown=='Piotrówka')||(deliveryTown=='Wierchlesie')||(deliveryTown=='Centawa')||(deliveryTown=='Gajdowe')||(deliveryTown=='Barut')){
        dostawa=3;
    }
    else if(deliveryTown=='Łaziska'){
        dostawa=4;
    }
    else if(deliveryTown=='Bokowe'){
        dostawa=5;
    }
    else if((deliveryTown=='Strzelce Opolskie')||(deliveryTown=='Warmątowice')){
        dostawa=7;
    }
    else if((deliveryTown=='Błotnica Strzelecka')||(deliveryTown=='Dziewkowice')){
        dostawa=8;
    }
    else if(deliveryTown=='Rożniątów'){
        dostawa=9
    }
    else if((deliveryTown=='Rozmierka')||(deliveryTown=='Sucha')||(deliveryTown=='Szymizszów')||(deliveryTown=='Kotulin')||(deliveryTown=='Osiek')){
        dostawa=12;
    }
    else if((deliveryTown=='Rozmierz')||(deliveryTown=='Żędowice')||(deliveryTown=='Sieronowice')){
        dostawa=13;
    }
    else if((deliveryTown=='Zawadzkie')||(deliveryTown=='Balcarzowice')){
        dostawa=14;
    }
    else if(deliveryTown=='Nogowczyce'){
        dostawa=15;
    }

    suma+=dostawa;

    let pack = 0;
    pack = pizzaName.length*2;

    suma+=pack;

    return (
        <>
            <View style={styles.container}>
                <FAB
                    style={styles.fab}
                    small
                    icon="check"
                    label={suma.toString()}
                    onPress={() => onSaveNote()}
                />
                <FAB style={styles.fab2}
                    small
                    icon="delete"
                    label='Anuluj'
                    onPress={() => navigation.navigate('ViewNotes')}
                />
                
                <View style={styles.input}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Miejscowość' 
                        placeholderTextColor='#888'
                        value={deliveryTown}
                        onChangeText={setDeliveryTown}
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Ulica' 
                        placeholderTextColor='#888'
                        value={deliveryStreet}
                        onChangeText={setDeliveryStreet}
                    />
                    <View style={styles.delTime}>
                        <TextInput 
                            style={styles.textInputHour} 
                            placeholder='Godzina' 
                            placeholderTextColor='#888'
                            value={deliveryHours}
                            onChangeText={setDeliveryHours}
                        />
                        <TextInput 
                            style={styles.textInputHour} 
                            placeholder='Minuty' 
                            placeholderTextColor='#888'
                            value={deliveryMin}
                            onChangeText={setDeliveryMin}
                        />
                    </View>
                </View>
                <View style={styles.food}>
                    <TouchableOpacity
                        style={styles.menuOption}
                        onPress={() => navigation.navigate('Order', {addPizza})}
                    >
                        <Image style={styles.image} source={require('../../assets/icons/pizza.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuOption}
                        onPress={() => navigation.navigate('SauceOrder', {addSauce})}
                    >
                        <Image style={styles.image} source={require('../../assets/icons/sauces.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headline}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 10,
                            marginBottom: 10,
                        }}
                    >Zamównienie</Text>
                    <TouchableOpacity 
                        style={styles.listDelete}
                        onPress={() => delPizza()}
                    >
                        <Image style={{
                            width: 20,
                            height: 20,
                            tintColor: 'white',
                        }} source={require('../../assets/icons/delete.png')} />
                    </TouchableOpacity>
                </View>
                    
                <ScrollView
                    style={{
                        width: '100%',
                    }}>
                    <View style={styles.flatlist}>
                        <View style={styles.listName}>
                        { pizzaName.map((item, key)=>(
                            <Text 
                                key={key} style={styles.listText}> { item } </Text>)
                        )}
                        </View>
                        <View style={styles.listSize}>
                        { pizzaSize.map((item, key)=>(
                            <Text key={key} style={styles.listText}> { item } </Text>)
                        )}
                        </View>
                        <View style={styles.listPrice}>
                        { pizzaPrice.map((item, key)=>(
                                <Text key={key} style={styles.listText}> { item } </Text>
                            )
                        )}
                        </View>
                    </View>
                    

                    <View style={styles.flatlist2}>
                        <View style={styles.listName}>
                        { sauceName.map((item, key)=>(
                            <Text key={key} style={styles.listText}> { item } </Text>)
                        )}
                        </View>
                        <View style={styles.listSize}>

                        </View>
                        <View style={styles.listPrice}>
                        { saucePrice.map((item, key)=>(
                            <Text key={key} style={styles.listText}> { item } </Text>)
                        )}
                        </View>
                    </View>

                    <View style={styles.headline}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                marginLeft: 10,
                                marginBottom: 10,
                            }}
                        >Dostawa</Text>
                        <Text
                            style={{
                                fontSize: 18,
                            }}
                        >{dostawa},00</Text>
                    </View>
                    <View style={styles.headline}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                marginLeft: 10,
                                marginBottom: 10,
                            }}
                        >Opakowania</Text>
                        <Text
                            style={{
                                fontSize: 18,
                            }}
                        >{pack},00</Text>
                    </View>
                    
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    food: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    }, 
    menuOption: {
        width: '40%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDD',
        borderRadius: 20,
    },
    image: {
        width: 50,
        height: 50,
    },
    input: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        marginTop: 60,
    },

    textInput: {
        width: '90%',
        height: 40,
        backgroundColor: '#DDD',
        color: 'black',
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 20,
    },
    delTime: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    textInputHour: {
        width: '45%',
        height: 40,
        backgroundColor: '#DDD',
        color: 'black',
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 20,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        top: 10,
        backgroundColor: '#219653',
        zIndex: 1,
        width: 150,
    },
    fab2: {
        position: 'absolute',
        margin: 20,
        left: 0,
        top: 10,
        backgroundColor: '#bf3232',
        zIndex: 1,
        width: 150,
    },

    flatlist: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        
    },
    flatlist2: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
    },

    listName: {
        width: '50%',
    },
    listPrice: {
        width: '25%',
        paddingLeft: 30,
    },
    listSize: {
        width: '25%',
        
    },
    listText: {
        color: 'black',
        fontSize: 18,
    },

    headline: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
    },

    listDelete: {
        width: 50,
        backgroundColor: '#bf3232',
        borderRadius: 20,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },


})

export default AddNotes