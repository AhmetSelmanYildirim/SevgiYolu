import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';
import Button from '../common/Button';
import { strings } from '../Lang/Strings';
import RNGooglePlaces from 'react-native-google-places';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

export default class Form extends Component {

  state = {
    yourLocation: '',
    herLocation: '',
    yourImgOk: require('../img/ok.png'),
    herImgOk: require('../img/ok.png'),
    yourLongLat: [],
    herLongLat: [],
    myPhoto: '',
    herPhoto: '',
  } 

  backAction = () => {
    Alert.alert(strings.quitMessage1, strings.quitMessage2, [
      {
        text: strings.quitMessageIgnore,
        onPress: () => null,
        style: "cancel"
      },
      { text: strings.quitMessageVerify, onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  componentDidMount() {
    this.setState({
      yourLocation: strings.location,
      herLocation: strings.herLocation,
    });

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );

  }



  renderSection(text, onPress, img) {                                                                           
    return (

      <TouchableOpacity
        style={styles.section}
        onPress={onPress}
      >
        <Text style={styles.konumunuz}>{text}</Text>
        <Image style={styles.ok} source={img} />
      </TouchableOpacity>

    );
  }

  showPhoto(type, text, onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
      >
        <Image
          source={ type === 'my' ? this.state.myPhoto : this.state.herPhoto}
          style={styles.photoStyle}
        />
        <Text style={styles.imagePickerButtonText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  renderImagePickerButton(text, onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
      >
        <View style={styles.imagePickerButton}>
          <Image
            source={require('../img/add.png')}
          >
          </Image>

        </View>
        <View><Text style={styles.imagePickerButtonText}>{text}</Text></View>
      </TouchableOpacity>

    );
  }

  openSearchModal(type) {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        if (type === 'my') {
          this.setState({
            yourLocation: place.name,
            yourImgOk: require('../img/check.png'),
            yourLongLat: [place.location.latitude, place.location.longitude],
          });
        }
        else {
          this.setState({
            herLocation: place.name,
            herImgOk: require('../img/check.png'),
            herLongLat: [place.location.latitude, place.location.longitude],
          });
        }

      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  openImagePicker(type) {

    const options = {
      title: strings.title,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      takePhotoButtonTitle: strings.takePhotoButtonTitle,
      chooseFromLibraryButtonTitle: strings.chooseFromLibraryButtonTitle,
      cancelButtonTitle: strings.cancelButtonTitle,
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        if (type === 'my') {
          this.setState({
            myPhoto: source,
          });
        } else {
          this.setState({
            herPhoto: source,
          });
        }

      }
    });
  }



  render() {
    return (
      <ImageBackground
        source={require('../img/bg.png')}
        style={styles.imageBG}
      >
        <Image source={require('../img/logopng.png')} />

        <View style={styles.sectionView}>
          {this.renderSection(
            this.state.yourLocation,
            () => this.openSearchModal('my'),
            this.state.yourImgOk,
          )}

          {this.renderSection(
            this.state.herLocation,
            () => this.openSearchModal('her'),
            this.state.herImgOk,
          )}

        </View>

        <View style={styles.imagePickerButtonView}>
          {this.state.myPhoto !== '' ?
            this.showPhoto(
              'my',
              strings.yourPhoto,
              () => this.openImagePicker('my'),
            )
            :

            this.renderImagePickerButton(
              
              strings.yourPhoto,
              () => this.openImagePicker('my'),
            )}



          {this.state.herPhoto !== '' ?
            this.showPhoto(
              'her',
              strings.herPhoto,
              () => this.openImagePicker('her'),
            )
            :

            this.renderImagePickerButton(
              strings.herPhoto,
              () => this.openImagePicker('her'),
            )}
        </View>

        <View>   
        {this.state.yourLongLat.length !== 0 && 
          this.state.herLongLat.length !== 0 && 
          this.state.myPhoto !== '' && 
          this.state.herPhoto !== '' 
          ?

        <Button 
        text={strings.buttonText} 
        onPress={ 
     
          () => Actions.Map({
          data:{
            yourLongLat: this.state.yourLongLat,
            herLongLat: this.state.herLongLat,
            myPhoto: this.state.myPhoto,
            herPhoto: this.state.herPhoto,
          }
          })   

        }   
        />

        :
        <View 
        style={styles.fillFieldsStyle}>
          <Text style={styles.errorMessageStyle}>{strings.errorMessage} </Text>

        </View>
        } 

        </View>   

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBG: { width, height, alignItems: 'center', justifyContent: 'center' },

  sectionView: {
    flexDirection: 'column'
  },

  section: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: width * 0.59,
    height: height * 0.045,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  konumunuz: {
    flex: 1,
    textAlign: 'center',
    marginLeft: '5%',
  },
  ok: {
    alignItems: 'flex-end',
  },

  imagePickerButtonView: {
    flexDirection: 'row',
    marginTop: 20,
    width: width * 0.59,
    justifyContent: 'space-around'
  },

  imagePickerButton: {
    width: width * 0.24,
    height: (height * 0.24) / 2,
    borderRadius: (width * 0.24),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePickerButtonText: {
    color: 'white',
    width: width * 0.24,
    textAlign: 'center',
    marginTop: 10,
  },

  photoStyle: {
    width: width * 0.24,
    height: (height * 0.24) / 2,
    borderRadius: (width * 0.24),
  },

  fillFieldsStyle:{
    backgroundColor:'#F45C3E', 
    width: width * 0.55,
    height: (height * 0.10) / 2,
    borderRadius: 10,
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  errorMessageStyle:{
    color:'white',
    textAlign:'center',
  },

});