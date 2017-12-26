import React, { Component } from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import { blue, white, grey } from '../utils/colors'

import DeckInfo from './DeckInfo'
import TextButton from './TextButton'




class DeckList extends Component{
    state={}
    static navigationOptions = ({navigation}) => {
        const {title}= navigation.state.params.deck
        return {
          title: title
        }
    }


    navAddQuestion = (deck) =>{
        const {navigate} =this.props.navigation;
        navigate('AddCard',{ deck: deck })                   
    }


    navQuiz = (deck) =>{
        const {navigate} =this.props.navigation;
        navigate('Quiz',{ deck: deck })                   
    }


    render(){
        console.log(this.props)
        const deck= this.props.navigation.state.params.deck
        const title =  deck.title
        const deckState = this.props.decks[title]
        
        const showQiz = deckState.questions && deckState.questions.length>0
        return (
            <View style={styles.container}>
                <View style={styles.deckInfo}>
                    <DeckInfo  deck={deckState} /> 
                </View>
                <View style={styles.deckButtons}>
                    <TextButton onPress={()=>this.navAddQuestion(deckState)}>
                        Add Card
                    </TextButton>
                    {showQiz&&
                        <TextButton onPress={()=>this.navQuiz(deckState)}>
                            Start Quiz
                        </TextButton>
                    }
                </View>
            </View>
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
    container:{
        flex:1,
        backgroundColor:white,
    },
    deckInfo:{
        flex:3,
        justifyContent: 'center',
    },
    deckButtons:{
        flex:2,
        justifyContent: 'center',
    }
})