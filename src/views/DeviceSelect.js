import React, {Component} from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import obd2 from 'react-native-obd2';
import DeviceCard from '../components/DeviceCard';
import {appendData} from '../actions/dataActions';

class DeviceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      device: undefined,
      obd2Data: {},
    };
    this.obdLiveData = this.obdLiveData.bind(this);
  }

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
  }

  selectDevice(device) {
    this.setState({device});
  }

  obdLiveData(data) {
    let copyData = JSON.parse(JSON.stringify(this.state.obd2Data));
    copyData[data.cmdID] = data;
    this.setState({obd2Data: copyData});
    appendData(data);
  }

  render() {
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
  }
}

export default DeviceSelect;
