import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

class MobileOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      storeOTP: null,
      verifyOTP: '',
    };
  }
  clickSendOTP() {
    if (this.state.mobileNumber.length !== 10) {
      alert('Please enter 10 digit mobile number');
    } else {
      auth()
        .signInWithPhoneNumber('+91' + this.state.mobileNumber)
        .then(storeOTP => {
          this.setState({storeOTP});
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    }
  }
  clickVerifyOTP() {
    if (this.state.verifyOTP.length == 6) {
      this.state.storeOTP
        .confirm(this.state.verifyOTP)
        .then(user => {
          console.log('user==', user);
          if (user.user.phoneNumber == '+91' + this.state.mobileNumber) {
            alert('OTP Verified');
            this.props.navigation.navigate('ProductList');
          } else {
            alert('Something is wrong!!!');
          }
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtLabel}>Enter Mobile Number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please enter mobile number"
          placeholderTextColor={'grey'}
          keyboardType="phone-pad"
          value={this.state.mobileNumber}
          onChangeText={mobileNumber => {
            this.setState({mobileNumber});
          }}
          maxLength={10}
          editable={this.state.storeOTP ? false : true}
        />
        {this.state.storeOTP ? (
          <>
            <Text style={styles.txtLabel}>Enter OTP</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please enter OTP"
              placeholderTextColor={'grey'}
              keyboardType="phone-pad"
              value={this.state.verifyOTP}
              onChangeText={verifyOTP => {
                this.setState({verifyOTP});
              }}
              maxLength={6}
            />
          </>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            {
              this.state.storeOTP ? this.clickVerifyOTP() : this.clickSendOTP();
            }
          }}>
          <Text style={styles.btnText}>
            {this.state.storeOTP ? 'Verify OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, margin: 16},
  txtLabel: {color: 'black', fontSize: 16, marginTop: 10},
  textInput: {borderWidth: 1, marginTop: 10, color: 'black'},
  btn: {borderWidth: 1, marginTop: 20, padding: 15},
  btnText: {color: 'black', textAlign: 'center', fontWeight: 'bold'},
});

export default MobileOTP;
