import React, { Component } from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { gray, orange, white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'


import TextButton from './TextButton'
import DeckInfo from './DeckInfo'
import Question from './Question'



export default class Quiz extends Component{
    state={
        currentQuestion:0,
        questions:[],
        score:0,
        totalQuestions:0,
        title:""
    };


    static navigationOptions = {
        title: 'Quiz',
    }
    

    componentDidMount () {
        const questions= this.props.navigation.state.params.deck.questions
        const title= this.props.navigation.state.params.deck.title
        
        
        this.setState((state)=>({
            ...state,
            questions:[...questions],
            totalQuestions: questions.length,
            title:title
        }))
    }


    incrementScore(){
        this.setState((state)=>({
            ...state,
            score: state.score+1
        }))
        this.nextQuestion()
    }


    nextQuestion(){
        this.setState((state)=>({
            ...state,
            currentQuestion: state.currentQuestion+1
        }))
    }


    navDeck =(title) =>{
        const {navigate} =this.props.navigation;
        navigate('DeckView',{title: this.state.title})   
    }

    navDeckBack =(title) =>{
        const {deck} = this.props.navigation.state.params;
        this.props.navigation.dispatch(NavigationActions.back({title: this.state.title}))
    }

    reset = ()=>{
        this.setState((state)=>({
            ...state,
            currentQuestion: 0,
            score:0
        }))
    }

    render(){
        const {currentQuestion, questions, score, totalQuestions}= this.state
        const notLastQuestion = !(currentQuestion>=totalQuestions)

        return (
            <View style={styles.container}>
                {notLastQuestion
                ?<View style={styles.container} >
                    <Text>{`${currentQuestion+1}/${totalQuestions}`}</Text>
                
                    <View style={styles.quizInfo}>
                        <Question question ={questions[currentQuestion]}></Question>
                    </View>

                    <View style={styles.quizButtons}>
                        <TextButton style={{margin: 20}} onPress={()=>this.incrementScore()}>
                            correct
                        </TextButton>
                        <TextButton style={{margin: 20}} onPress={()=>this.nextQuestion()}>
                            incorrect
                        </TextButton>
                    </View>
                </View>
                :<View style={styles.scoreContainer}>
                    <View style={styles.quizInfo}>
                        <Text style={{fontSize: 25, color: purple}}>you scored</Text>
                        <Text style={{fontSize: 50, color: gray, margin:10}}>{`${Math.round( score/totalQuestions*100)}%`}</Text>
                    </View>

                    <View style={styles.quizButtons}>
                        <TextButton style={{margin: 20}} onPress={()=>this.reset()}>
                            restart quiz
                        </TextButton>
                        <TextButton style={{margin: 20}} onPress={()=>this.navDeckBack()}>
                            back to deck
                        </TextButton>
                    </View>
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
        alignItems: 'stretch',
    },
    scoreContainer:{
        flex:1,
        backgroundColor:white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quizInfo:{
        flex:3,
        justifyContent: 'center',
    },
    quizButtons:{
        flex:2,
        justifyContent: 'center',
    }
})