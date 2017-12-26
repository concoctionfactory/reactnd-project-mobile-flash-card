import React from 'react';
import { View,Text, StatusBar,ScrollView  } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

import {getDecks} from './utils/api';
import { setLocalNotification } from './utils/helpers'
import { blue, white, purple } from './utils/colors'



function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = TabNavigator({
  DeckList:{
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck:{
    screen:AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  }
},{
navigationOptions: {
  header: null
},
});


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard:{
    screen:AddCard,
  },
  Quiz:{
    screen:Quiz,
  }
})


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
    
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View  style={{flex: 1}}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content"/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}


