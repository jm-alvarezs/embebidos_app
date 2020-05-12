import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import obd2 from 'react-native-obd2';
import {getCoords} from '../geolocation';
import {postCarga} from '../actions/dataActions';
import {connect} from 'react-redux';
import Gasolineras from './Gasolineras';

class Running extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      gasolineras: false
    }
    this.registrarCarga = this.registrarCarga.bind(this);
  }

  registrarCarga() {
    getCoords(coords => {
      const {latitude, longitude} = coords;
      this.props.postCarga(this.props.VIN, latitude, longitude);
    });
  }

  renderGasolineras() {
    if(this.state.gasolineras)
    return <Gasolineras onPress={() => this.setState({ gasolineras: false })} />;
  }

  renderBotones() {
    if(!this.state.gasolineras)
    return (
      <>
      <Button
            onPress={() => this.setState({ gasolineras: true })}
            title="Ver Gasolineras"
            containerStyle={{
              marginVertical: 64,
              marginHorizontal: '5%',
              width: '100%',
            }}
          />
        <Button
          onPress={this.registrarCarga}
          title="Registrar Carga"
          containerStyle={{
            marginVertical: 48,
            marginHorizontal: '5%',
            width: '100%',
          }}
        />
        <Button
          onPress={obd2.stopLiveData}
          title="Stop"
          containerStyle={{marginHorizontal: '5%', width: '100%'}}
        />
      </>
    );
  }

  render() {
    let temp = this.props.ENGINE_COOLANT_TEMP[
      this.props.ENGINE_COOLANT_TEMP.length - 1
    ];
    if (temp) temp = temp.cmdResult;
    return (
      <View style={{width: '100%'}}>
        <View style={{width: '90%', alignContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 72,
              marginTop: 20,
              marginHorizontal: '5%',
            }}>
            {temp}
          </Text>          
          {this.renderGasolineras()}
          {this.renderBotones()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data.data,
  VIN: state.data.data.VIN,
  ENGINE_COOLANT_TEMP: state.data.data.ENGINE_COOLANT_TEMP,
});

export default connect(
  mapStateToProps,
  {postCarga},
)(Running);
