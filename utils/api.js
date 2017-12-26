import { AsyncStorage } from 'react-native'
import {getDummyDeckInfo} from  './helpers'



export const DECK_STORAGE_KEY = 'FlashCard:deck'


export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((res)=>(formatResults(res)))
}


export function getDeck (title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY )
    .then((res)=>(JSON.parse(res)))
    .then((res)=>(res[title]))
}


export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title:title,
            questions:[]
        }
      }))
}


export function addCardToDeck ({title,card}) {
    getDeck(title)
        .then((deck)=>{
            deck.questions = [...deck.questions,card ];
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                [title]:deck
            }))
        });
}


function formatResults(results){
    return results === null
    ? setDummyData()
    : setData(results)
}


function setDummyData(){
    dummyData = getDummyDeckInfo();
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(getDummyDeckInfo()))
    return dummyData
}


function setData(results){
    return (JSON.parse(results))
}