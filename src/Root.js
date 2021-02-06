import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Router, Stack, Scene, } from 'react-native-router-flux';
import Map from './components/Map';
import FinalScreen from './components/FinalScreen';
import Form from './components/Form';
import Statistics from './components/Statistics';
const { width } = Dimensions.get('screen');

export default class Root extends Component {

    render() {                                                            /* Keyler ile sayfalar isimlendirilir ve çağırılır.*/
        return (
            <Router
                navigationBarStyle={styles.navbar}
            >
                <Stack key="Root">


                    <Scene key="Form" component={Form} hideNavBar initial />

                    <Scene key="Map" component={Map} hideNavBar />

                    <Scene key="Statistics" component={Statistics} hideNavBar />

                    <Scene key="FinalScreen" component={FinalScreen} hideNavBar />




                </Stack>

            </Router>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#5300FF',
    },
});