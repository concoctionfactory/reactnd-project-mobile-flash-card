import React, { Component } from 'react'
import { View,Text,StyleSheet,TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Constants } from 'expo';

import { addCardToDeck } from '../utils/api'
import { gray, orange, white } from '../utils/colors'

import TextButton from './TextButton'
import { addCard} from '../actions'




class AddCard extends Component{
    static navigationOptions = {
        title: 'Add Card',
    }
    
    state={
        question: "",
        answer: "",
    }


    submit(){
        const { dispatch } = this.props
        const submitQuestion = this.state.question? this.state.question :"test question"
        const submitAnswer = this.state.answer? this.state.answer :"test answer"
        const card ={
            question:submitQuestion,
            answer:submitAnswer
        }
        const title= this.props.navigation.state.params.deck.title
        dispatch(addCard({title,card}))
        addCardToDeck({title,card})
       this.navDeck();
    }


    navDeck = () =>{
        const {deck} = this.props.navigation.state.params;
        this.props.navigation.dispatch(NavigationActions.back({deck: deck}))
    }


    render(){
        return (
            <View style={styles.addCard}>
                <Text style={[styles.text,{ marginTop:40}] }>question</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="question"
                    onChangeText={(question) => this.setState({question})}
                />

                <Text style={styles.text}>answer</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="answer"
                    onChangeText={(answer) => this.setState({answer})}
                />

                <TextButton  onPress={()=>this.submit()}>
                    submit
                </TextButton>
            </View>
        )
    }
}

export default connect()(AddCard)


const styles = StyleSheet.create({

    addCard:{
        flex:1,
        backgroundColor:white,
        alignItems: 'stretch',
    },
    text:{
        fontSize: 20,
        color: gray,
        marginBottom: 5,
        textAlign:'center',
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        textAlign:'center',
        height:40,
        marginLeft:20,
        marginRight:20,
        marginBottom: 40,
        
    }
})