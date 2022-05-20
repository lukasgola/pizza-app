import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ViewNotes({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [id_counter, setId_counter] = useState(0);

    const addNote = note => {
        const item = {
            id: id_counter,
            note: note
        }
        if(notes.length == 0){
            setId_counter(0)
        }
        else{
            setId_counter(id_counter + 1);
        }
        setNotes([...notes, item])
        save()
        alert(JSON.stringify(notes))
    }

    const editNote = (id,note) => {
        const item = {
            id: id,
            note: note
        }
        setNotes( arr => [...arr, item]);
        save()
    }

    const deleteNote = id => {
        const filtered = notes.filter( item => item.id != id)
        setNotes(filtered)
        save(filtered)
    }

    const save = async => {
        try {
            AsyncStorage.setItem('@MySuperStore:notes1',JSON.stringify(notes));
            AsyncStorage.setItem('@MySuperStore:counter',JSON.stringify(id_counter));
        } catch (error) {
            console.log(error)
        }
    };

    const load = async () => {
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:notes1');
            const value1 = await AsyncStorage.getItem('@MySuperStore:counter');
            if (value !== null) {
                setNotes(JSON.parse(value))
            }
            if(value1 !== null){
                setId_counter(value1);
            }
        } catch (error) {
            console.log(error)
        } 
    };


    useEffect(() => {
        //save();
        //remove();
        load();
    }, []);

    

    return (
        <>
            <View style={styles.container}>
                {notes.length === 0 ? (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Brak zamówień</Text>
                    </View>
                ) : (
                        <FlatList
                            data={notes}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cardContainer}
                                    onPress={() => navigation.navigate('EditNotes', {
                                        item, editNote, deleteNote,
                                    })}
                                >
                                    <FAB
                                        style={styles.delete}
                                        small
                                        icon="check"
                                        onPress = {() => deleteNote(item.id)
                                        }
                                    />
                                    <View style={styles.price}>
                                        <Text
                                            style={{
                                                color: 'white'
                                            }}
                                        >{item.note.suma},00</Text>
                                    </View>
                                    <View style={styles.cardView}>
                                        <View style={styles.address}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                }}
                                            >{item.note.deliveryTown}</Text>
                                            <Text>{item.note.deliveryStreet}</Text>
                                        </View>
                                        <View
                                            style={{
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <View style={styles.time}>
                                                <Text>{item.note.orderHours}:{item.note.orderMin}</Text>
                                                <Text
                                                    style={{
                                                        color: '#219653',
                                                        fontWeight: 'bold',
                                                    }}
                                                >  {'>>>'}  </Text>
                                                <Text style={styles.timeText}>{item.note.deliveryHours}:{item.note.deliveryMin}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                marginBottom: 10,
                                            }}
                                        >Zamównienie</Text>
                                    </View>
                                    <View style={styles.foodlist}>
                                            <View style={styles.flatlist}>
                                                <View style={styles.nameList}>
                                                { item.note.pizzaName.map((item, key)=>(
                                                    <Text 
                                                        key={key}> { item } </Text>)
                                                )}
                                                </View>
                                                <View style={styles.sizeList}>
                                                { item.note.pizzaSize.map((item, key)=>(
                                                    <Text key={key}> { item } </Text>)
                                                )}
                                                </View>
                                                <View style={styles.priceList}>
                                                { item.note.pizzaPrice.map((item, key)=>(
                                                    <Text key={key}> { item } </Text>)
                                                )}
                                                </View>
                                            </View>
                                            <View style={styles.flatlist2}>
                                                    <View style={styles.nameList}>
                                                    { item.note.sauceName.map((item, key)=>(
                                                        <Text key={key}> { item } </Text>)
                                                    )}
                                                    </View>
                                                    <View style={styles.sizeList}>
                        
                                                    </View>
                                                    <View style={styles.priceList}>
                                                    { item.note.saucePrice.map((item, key)=>(
                                                        <Text key={key}> { item } </Text>)
                                                    )}
                                                    </View>
                                            </View>
                                            
                                        </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    )}

                <FAB
                    style={styles.fab}
                    small
                    icon='plus'
                    label='Dodaj zamówienie'
                    onPress={() => navigation.navigate('AddNotes', {
                       addNote, deleteNote
                    })
                    }
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    fab: {
        backgroundColor: '#219653',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    },
    cardContainer:{
        width: '90%',
        backgroundColor: '#DDD',
        marginLeft: '5%',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardView: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
    },

    foodlist:{
        width: '100%',
        paddingBottom: 30,
    },

    flatlist: {
        width: '100%',
        flexDirection: 'row',
    },
    flatlist2: {
        width: '100%',
        flexDirection: 'row',
    },

    nameList:{
        width: '50%',
    },

    sizeList:{
        width: '25%',
    },  

    priceList:{
        width: '25%',
    },  

    address: {
        width: '50%',
    },

    time: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#EEE',
        width: 130,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    timeText: {
        fontWeight: 'bold',
    },  

    price: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 150,
        height: 30,
        backgroundColor: '#219653',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    delete: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#219653'
    },

})

export default ViewNotes;