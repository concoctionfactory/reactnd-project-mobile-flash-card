import React, { Component } from 'react'
import { View,StyleSheet,Text } from 'react-native'
import { connect } from 'react-redux'

import { gray, orange, blue, white, purple } from '../utils/colors'



class DeckInfo extends Component{
    render(){
        console.log("info")
        const title =  this.props.deck.title
        const deck  =  this.props
        const deckState = this.props.decks[title]
        return (
            <View style={styles.info}>
                <Text style={{fontSize: 30, color: gray}}> 
                    {deckState.title}
                </Text>
                <Text style={{fontSize: 15, color: orange}}>
                    {(deckState.questions? deckState.questions.length : 0) + " cards"}
                </Text>
           
            </View>
        )
    }
}


function mapStateToProps (decks) {
    return {
        decks
    }
}


export default connect(mapStateToProps)(DeckInfo)


const styles = StyleSheet.create({
    info: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding:50,
        backgroundColor: white,
    },
})

