import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking, TouchableOpacity } from 'react-native';
import Button from '../common/Button';
import { strings } from '../Lang/Strings';
import Share from 'react-native-share';
import Statistics from './Statistics';
import ExitButton from '../common/ExitButton';

//https://play.google.com/store/apps/details?id=com.mutlulugagidenyol
const { width, height } = Dimensions.get('window');

export default class FinalScreen extends Component {

  state = {
    inStatistics: true
  }

  render() {


    const image = 'data:image/png;base64,' + this.props.data.uri;

    const shareOptionsImage = {
      url: this.props.data.uri,
      type: 'image/png',
    };

    const shareOptionsAppShare = {
      title: strings.shareTitle,
      message: strings.shareMassage,
      url: 'https://drive.google.com/drive/u/0/folders/1EWZ8aA33BJt-xQ-6Cq2gYRiOOgUs9wSc',
    };

    console.log(this.props.data)

    if (this.state.inStatistics) {
      return (
        <View style={styles.statisticsContainer} >

        <Statistics
        myPhoto = {this.props.data.myPhoto}
        herPhoto = {this.props.data.herPhoto}
        distance = {this.props.data.distance}
        duration = {this.props.data.duration}
        yourLongLat = {this.props.data.yourLongLat}
        herLongLat = {this.props.data.herLongLat}

        onPress={ () => this.setState({ inStatistics : false })  }

        />

        </View>
      )
    }

    else {
      return (

        <View style={styles.container}>

          <Image
            style={{ marginTop: 50 }}
            source={require('../img/logo.png')}
          />

          <Image
            source={{ uri: this.props.data.uri }}
            style={styles.imageStyle}
          />

          <View style={styles.subContainer}>

            <Button
              text={strings.shareImage}
              onPress={() => Share.open(shareOptionsImage)}
              backgroundColor={'orange'}

            />

            <Button
              text={strings.shareApp}
              onPress={() => Share.open(shareOptionsAppShare)}
              backgroundColor={'orange'}
            />

            {/* <Text
          onPress={ () => Linking.openURL('#')} 
          style={{marginTop:20}}
          >
            {strings.givePoint}

          </Text> */}

          </View>

          <ExitButton
            marginTop={"8%"}
            marginBottom={"1%"}
          />

          <View style={{ justifyContent: 'flex-end', height: height * 0.15 }}>
            <Text
              style={{ color: 'white', textAlign: 'center', fontSize: 10, }}
            >
              {strings.bottomText}

            </Text>
          </View>

        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002547',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.36,
    height: height * 0.25,
    marginTop: 30,
    borderWidth: 2,
    borderColor: 'orange',
    zIndex: 2,

  },
  subContainer: {
    marginTop: -30,
    paddingBottom: 30,
    backgroundColor: 'white',
    width: width - 40,
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },

  statisticsContainer:{
    flex: 1,
    backgroundColor: '#0aa5a7',
    justifyContent: 'center',
    alignItems: 'center',
  },

});