import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, blue, white, grey  } from '../utils/colors'

export default function TextButton ({ children, onPress}) {
  return (
    <TouchableOpacity style={styles.button}  onPress={onPress}>
      <Text style={styles.reset}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: white,
  },
  button:{
    backgroundColor: purple,
    padding: 20,
    alignItems: 'center',
    marginLeft:20,
    marginRight:20,
    marginBottom:20,
  }
})