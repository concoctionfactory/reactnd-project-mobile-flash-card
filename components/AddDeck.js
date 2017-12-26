import React, { Component } from 'react'
import { View,Text,StyleSheet,TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Constants } from 'expo';

import { saveDeckTitle } from '../utils/api'
import { gray, orange, white } from '../utils/colors'

import TextButton from './TextButton'
import { addDeck } from '../actions'



class AddDeck extends Component{
    state={
        title: "",
    }

    submit(){
        const { dispatch } = this.props
        const submitTitle = this.state.title? this.state.title :"test title"
        dispatch(addDeck(submitTitle))
        saveDeckTitle(submitTitle)
        this.navHome();
    }


    navHome = () =>{
        const {navigate} =this.props.navigation;
        navigate('Home')                   
    }


    render(){
        return (
            <View  style={styles.addCard}>
                <Text style={[styles.text,{ marginTop:40}]}>
                    What is the title of your new Deck?
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    onChangeText={(title) => this.setState({title})}
                />
                <TextButton onPress={()=>this.submit()}>
                    submit
                </TextButton>
            </View>
        )
    }
}

export default connect()(AddDeck)



const styles = StyleSheet.create({
    
        addDeck:{
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