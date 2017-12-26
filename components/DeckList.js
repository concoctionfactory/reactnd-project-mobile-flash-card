import React, { Component } from 'react'
import { View,Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Constants } from 'expo';

import { getDecks } from '../utils/api'
import { blue, white, grey } from '../utils/colors'

import { receiveDecks } from '../actions'
import DeckInfo from './DeckInfo'



class DeckList extends Component{
    state={
        ready: false,
    }


    componentDidMount () {
        const { dispatch } = this.props 
        getDecks().then((decks)=>dispatch(receiveDecks(decks)))
    }


    render(){
        const {decks} = this.props;
        const {navigate} = this.props.navigation;
        console.log("test");
        return (
            <ScrollView style={styles.deckList}>
                {Object.keys(decks).map((key)=> {
                    const deck =decks[key]
                     return (
                        <TouchableOpacity style={styles.deckContainer} key={key}
                            onPress={() =>navigate(
                                'DeckView',
                                { deck: deck }
                                )}                     
                        >
                            <DeckInfo deck={deck} />
                        </TouchableOpacity>
                     )
                })}
            </ScrollView>
        )
    }
}


function mapStateToProps (decks) {
    return {
        decks
    }
}


export default connect(mapStateToProps)(DeckList)


const styles = StyleSheet.create({
    deckList:{
        marginTop: Constants.statusBarHeight,
        backgroundColor:white,
        flex:1
    },
    deckContainer:{
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
})
  