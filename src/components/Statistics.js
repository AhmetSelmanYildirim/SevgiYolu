import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';
import Button from '../common/Button';
import { strings } from '../Lang/Strings';


const { width, height } = Dimensions.get('screen');





export default class Statistics extends Component {

    

    kmToCm(km) { return km * 1000 * 100 }

    

    render() {

        let angle = (Math.atan2( this.props.herLongLat[1] - this.props.yourLongLat[1] , this.props.herLongLat[0] - this.props.yourLongLat[0] ) * 180 /Math.PI).toFixed(2);

        return (
            <View style={styles.statisticsContainer}>

                <View style={styles.photosTogether}>
                    <Image source={this.props.myPhoto} style={styles.kalp} />
                    <Image source={require('../img/kalp.png')} style={styles.kalp} />
                    <Image source={this.props.herPhoto} style={styles.kalp} />
                </View>

                <Text style={{ color: "yellow", marginVertical: 15, }}>{strings.statistics}</Text>

                <View style={styles.statisticsSection}>

                    <Text style={{textAlign:'center'}}>{strings.statisticsRoseLength1}</Text>
                    <Text style={{textAlign:'center'}}> { strings.statisticsRoseLength2 } {Math.floor(this.kmToCm(this.props.distance) / 5)} {strings.statisticsRoseLength3}</Text>
                    <Text> </Text>
                    <Text style={{textAlign:'center'}}>{strings.duration0}</Text>
                    <Text style={{textAlign:'center'}}> {strings.duration1} {Math.floor(this.props.duration)} {strings.duration2} </Text>
                    <Text> </Text>
                    <Text>{strings.angle0}</Text>
                    <Text style={{textAlign:'center'}}> { angle <=180 && angle > 0 ? `${strings.angleRL1} ${angle} ${strings.angleR}` : `${strings.angleRL1} ${Math.abs(angle)} ${strings.angleL}` }  </Text>

                </View>


                <Button
                    text={strings.shareScreen}
                    onPress={() => this.props.onPress()}
                >
                </Button>


            </View>

        );
    }
}


const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#5300FF',
    },
    statisticsContainer: {
        flex: 1,
        backgroundColor: '#0aa5a7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    kalp: {
        width: width * 0.16,
        height: height * 0.09,
        borderRadius: 10
    },
    photosTogether: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 0.50,
    },
    statisticsSection: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: width *0.85,
        padding: 10,
    }
});