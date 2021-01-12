import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Root from './src/Root';


export default class App extends Component{

  render() {
    return (                                                                    
      <View style={styles.container}>
        <Root />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});


