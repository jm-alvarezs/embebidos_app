import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
  Linking
} from 'react-native';
import {Card} from 'react-native-elements';
import {getGasolineras} from '../actions/gasolinerasActions';
import {connect} from 'react-redux';

class Gasolineras extends Component {
  componentDidMount() {
    this.props.getGasolineras(this.props.VIN);
  }

  renderGasolineras() {
    console.log(this.props.gasolineras);
    if (this.props.gasolineras === null)
      return <ActivityIndicator color="#191919" />;
    return this.props.gasolineras.map(gasolinera => (
      <Card containerStyle={card}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 48,
          }}>
          <View style={{flexDirection: 'column', width: '100%'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {gasolinera.name}
            </Text>
            <Text>{gasolinera.formatted_address}</Text>
            <Button containerStyle={{ marginTop: 32 }} title="Ir ahora" onPress={() => {
              const url = `https://www.google.com/maps/place/${encodeURI(gasolinera.formatted_address)}/`;
              console.log(url);
              Linking.openURL(url)
            }} />
          </View>
        </View>
      </Card>
    ));
  }

  render() {
    return (
      <ScrollView
        style={{width: '110%', flexDirection: 'column', marginBottom: 550}}
        contentContainerStyle={{alignItems: 'center'}}>
        <Button
          onPress={this.props.onPress}
          title="Regresar"
          containerStyle={{
            marginVertical: 64,
            marginHorizontal: '5%',
            width: '100%',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            width: '90%',
          }}>
          Gasolineras recomendadas
        </Text>
        {this.renderGasolineras()}
      </ScrollView>
    );
  }
}

const card = StyleSheet.create({
  padding: 20,
  borderRadius: 20,
  borderWidth: 0,
});

const mapStateToProps = state => ({
  gasolineras: state.gasolineras.gasolineras,
  VIN: state.data.data.VIN,
});

export default connect(
  mapStateToProps,
  {getGasolineras},
)(Gasolineras);
