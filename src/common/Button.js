import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Button extends Component {

  render() {
    return (
        <TouchableOpacity 
        style={[styles.button, {backgroundColor: this.props.backgroundColor ? this.props.backgroundColor :'#5300FF',}]}
        onPress={() => this.props.onPress()}
        >
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    width: width*0.71,
    height: height*0.07,
    marginTop:20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText:{
    color:'white'
  }

});