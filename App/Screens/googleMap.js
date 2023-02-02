import React, {useState, useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const GoogleMap = () => {
  const [location, setLocation] = useState();
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log('position===', position);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922,
            });
          },
          error => {
            // See error code charts below.
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 23.0697624,
          longitude: 72.5036968,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {location && (
          <Marker
            coordinate={
              location
                ? location
                : {
                    latitude: 23.0697624,
                    longitude: 72.5036968,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }
            }
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GoogleMap;
