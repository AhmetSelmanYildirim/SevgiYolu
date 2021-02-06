import React, { Component } from 'react';
import Button from '../common/Button';
import { View, BackHandler, Alert } from 'react-native';
import { strings } from '../Lang/Strings';

export default class ExitButton extends Component {

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
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    render() {
        return (
            <View style={[
            { marginBottom: this.props.marginBottom ? this.props.marginBottom : "-25%" },
            { marginTop: this.props.marginTop ? this.props.marginTop : "25%" }]}>
                <Button
                    backgroundColor="red"
                    text={strings.exit}
                    width={40} height={25}
                    onPress={() => this.backAction()}
                >
                </Button>
            </View>
        );
    }
}
