import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { captureScreen } from "react-native-view-shot";

const { width, height } = Dimensions.get('window');

export default class Map extends Component {
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 5,
            longitudeDelta: 5,
        },
    }

    componentDidMount() {                        /* Uygulama ilk açıldığında buraya düşer */

        const { yourLongLat } = this.props.data;

        this.setState({
            region: {
                latitude: yourLongLat[0],
                longitude: yourLongLat[1],
                latitudeDelta: 5,
                longitudeDelta: 5,
            },
            isButtonShow: true,
        });
    }



    screenShot() {

        this.setState({                                                                         //UYGULAMADAN GELEN ENLEM VE BOYLAMLARIN STATELERİNİ DEĞİŞTİR.
            isButtonShow: false,
        });

        setTimeout(() => {
            captureScreen({
                format: "jpg",
                quality: 1,
            }).then(
                uri => {
                    console.log("Image saved to", uri);
                    Actions.FinalScreen({
                        data: {
                            uri,
                            myPhoto: this.props.data.myPhoto,
                            herPhoto: this.props.data.herPhoto,
                        }
                    });
                },
                error => console.error("Oops, snapshot failed", error)
            );
            this.setState({                                                                      
                isButtonShow: true,
            });
        }, 1000);





    }

    render() {
        const { yourLongLat, herLongLat } = this.props.data;

        const origin = { latitude: yourLongLat[0], longitude: yourLongLat[1] };
        const destination = { latitude: herLongLat[0], longitude: herLongLat[1] };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyDBEJkPknVJIHI_scumBqIsJUZGqBTRpGE';

        return (
            <View style={styles.mapView}>
                <MapView
                    style={[styles.mapViewStyle, { ...StyleSheet.absoluteFillObject }]}      /* AbsoluteFillObject içinde olmamasına rağmen dışarda yazılan viewların fonu olmasını sağlar */
                    region={this.state.region}
                    onRegionChangeComplete={(region) => {
                        console.log(region);
                        this.setState({
                            region: {
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: region.latitudeDelta,
                                longitudeDelta: region.longitudeDelta,
                            },
                            isButtonShow: true,
                        });
                    }
                    }
                >
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="#f75d80"
                    />

                    <Marker coordinate={origin}> 

                    <View >
                        <View style={styles.leftHeart} />
                        <View style={styles.rightHeart} />
                    </View>

                        <Image
                        style={{ width: width*0.16, height: height*0.09, borderWidth:1, borderColor:"orange", borderRadius:10}}
                        source={this.props.data.myPhoto}
                    />
                    

                    </Marker>
                    <Marker coordinate={destination}>

                        <Image
                            style={{ width: width*0.16, height: height*0.09, borderWidth:1, borderColor:"orange", borderRadius:10 }}
                            source={this.props.data.herPhoto}
                        />

                    </Marker>



                </MapView>

                {this.state.isButtonShow ? <TouchableOpacity
                    onPress={() => this.screenShot()}
                    style={styles.buttonPressStyle}
                >

                    <Image
                        source={require('../img/button.png')}
                    />

                </TouchableOpacity>
                    :
                    null
                }





            </View>
        );
    }
}

const styles = StyleSheet.create({

    mapView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    mapViewStyle: {
        flex: 1,
    },

    buttonPressStyle: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },


    heart: {
        width: 50,
        height: 50,
      },
      heartShape: {
        width: 30,
        height: 45,
        position: "absolute",
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "#6427d1",
      },
      leftHeart: {
        transform: [{ rotate: "-45deg" }],
        left: 5,
      },
      rightHeart: {
        transform: [{ rotate: "45deg" }],
        right: 5,
      },


});