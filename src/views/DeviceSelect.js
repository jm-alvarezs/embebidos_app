import React, {Component} from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import obd2 from 'react-native-obd2';
import DeviceCard from '../components/DeviceCard';
import {setDevice} from '../actions/deviceActions';
import {appendData, postData} from '../actions/dataActions';
import {connect} from 'react-redux';
import Running from './Running';

class DeviceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      device: undefined,
      obd2Data: {},
    };
    this.obdLiveData = this.obdLiveData.bind(this);
    this.postData = this.postData.bind(this);
  }

  intervals = {};

  fields = [
    'FUEL_LEVEL',
    'ENGINE_RPM',
    'FUEL_CONSUMPTION_RATE',
    'ENGINE_COOLANT_TEMP',
  ];

  componentDidMount() {
    obd2.ready();
    obd2
      .getBluetoothDeviceNameList()
      .then(devices => {
        this.setState({devices});
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.device !== this.state.device) {
      this.connectDevice();
    }
  }

  connectDevice() {
    const {device} = this.state;
    this.obdLiveDataListener = DeviceEventEmitter.addListener(
      'obd2LiveData',
      this.obdLiveData,
    );
    obd2.startLiveData(device.address);
    this.props.setDevice(device);
  }

  selectDevice(device) {
    this.setState({device});
  }

  postData(cmdID) {
    this.props.postData(this.props.VIN, cmdID, this.props[cmdID]);
  }

  obdLiveData(data) {
    let copyData = JSON.parse(JSON.stringify(this.state.obd2Data));
    copyData[data.cmdID] = data;
    this.setState({obd2Data: copyData});
    if (this.fields.findIndex(cmdID => cmdID === data.cmdID) !== -1) {
      if (this.props[data.cmdID].length === 0) {
        setInterval(() => {
          this.postData(data.cmdID);
        }, 5000);
      }
      if (data.cmdResult !== null) {
        this.props.appendData(this.props.VIN, data);
      }
    } else if (data.cmdID === 'VIN') {
      this.props.appendData(data.cmdResult);
    }
  }

  renderComponent() {
    if (!this.props.device)
      return (
        <View>
          <Text style={{textAlign: 'center', fontSize: 24, marginTop: 20}}>
            Selecciona tu Dispositivo OBD2
          </Text>
          {this.state.devices.map(device => (
            <DeviceCard
              key={device.address}
              device={device}
              onPress={() => this.selectDevice(device)}
            />
          ))}
        </View>
      );
    return <Running />;
  }

  render() {
    return <View>{this.renderComponent()}</View>;
  }
}

const mapStateToProps = state => ({
  VIN: state.data.data.VIN,
  FUEL_LEVEL: state.data.data.FUEL_LEVEL,
  ENGINE_RPM: state.data.data.ENGINE_RPM,
  FUEL_CONSUMPTION_RATE: state.data.data.FUEL_CONSUMPTION_RATE,
  ENGINE_COOLANT_TEMP: state.data.data.ENGINE_COOLANT_TEMP,
  device: state.devices.device,
});

export default connect(mapStateToProps, {appendData, postData, setDevice})(
  DeviceSelect,
);
