import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView
} from "react-native";

import { connect } from "react-redux";
import { fetchData } from "./actions";

let styles;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinats: {
        lon: undefined,
        lat: undefined
      },
      refreshing: false
    };
  }

  async componentWillMount() {
    await this.getLocation();
    // await this.props.fetchData(this.state.coordinats);
  }

  success = pos => {
    var crd = pos.coords;
    this.setState({
      coordinats: {
        lon: crd.longitude,
        lat: crd.latitude
      }
    });
  };

  getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(this.success);
  };

  toCel = num => {
    return (Number(num) - 273.15).toFixed(2);
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getLocation();
    await this.props.fetchData(this.state.coordinats);
    await this.setState({ refreshing: false });
  };

  render() {
    const { container, text, mainContent } = styles;
    const weatherData = this.props.appData.data;

    return (
      <View style={container}>
        <Text style={text}>WEATHER</Text>
        <Text style={styles.wordBold}>
          Добро пожаловать в приложение, чтобы получить/обновить инормацию о
          погоде для вашей широты и долготы потяните вниз экран
        </Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={{ mainContent }}>
            {this.props.appData.isFetching && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}

            {weatherData.data ? (
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 25, color: "red", fontWeight: "bold" }}
                >
                  {weatherData.data.name}{" "}
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: `http://openweathermap.org/img/w/${
                        weatherData.data.weather[0].icon
                      }.png`
                    }}
                  />
                  {"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: 20
                  }}
                >
                  Current temp: {this.toCel(weatherData.data.main.temp)}°{"\n"}
                  High temp: {this.toCel(weatherData.data.main.temp_max)}°{" "}
                  {"\n"}
                  Low temp: {this.toCel(weatherData.data.main.temp_min)}° {"\n"}
                  Wind Speed: {weatherData.data.wind.speed} m/s
                  {"\n"}
                  Pressure: {weatherData.data.main.pressure} mi/hr
                  {"\n"}
                  Humidity: {weatherData.data.main.humidity} %
                </Text>
                <Text>
                  {"\n"}
                  {"\n"}
                </Text>
                <Text>Широта: {this.state.coordinats.lat}</Text>
                <Text>Долгота: {this.state.coordinats.lon}</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20
  },
  wordBold: {
    fontWeight: "bold",
    color: "#37859b",
    fontStyle: "italic",
    padding: 20
  },
  text: {
    textAlign: "center",
    fontFamily: "Georgia",
    fontSize: 40,
    color: "blue",
    fontWeight: "bold"
  },

  mainContent: {
    margin: 10
  },
  scrollview: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

export default connect(
  mapStateToProps,
  { fetchData }
)(App);
