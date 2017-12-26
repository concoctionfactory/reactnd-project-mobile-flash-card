import React, { Component } from 'react'
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, gray, orange, white } from '../utils/colors'
import TextButton from './TextButton'


export default class Question extends Component{
    state={
        isShowQuestion:true,
    };

    toggleAnswer(){
        this.setState({isShowQuestion: !this.state.isShowQuestion})
    }

    render(){
        const questionCon =this.props.question
        const answer =questionCon?questionCon.answer:""
        const question =questionCon?questionCon.question:""
        const {isShowQuestion}= this.state
        
        return (
            <View style={styles.container}>
                {isShowQuestion
                ?<View>
                    <Text style={styles.text}>{question}</Text>
                    <TouchableOpacity style={{margin: 20}} onPress={()=>this.toggleAnswer()}>
                        <Text style={styles.button}>answer</Text>
                    </TouchableOpacity>
                </View>
                :<View>
                    <Text style={styles.text}>{answer}</Text>
                    <TouchableOpacity style={{margin: 20}} onPress={()=>this.toggleAnswer()}>
                        <Text style={styles.button}>question</Text>
                </TouchableOpacity>
                </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      margin:20
    },
    button:{
        textAlign: 'center',
        fontSize: 10,
        padding:20
    }
  })