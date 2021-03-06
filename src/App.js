import React, { Component } from 'react';
import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';
import Nav from './components/nav'
import FilterMinders from './components/filterMinders'
import API from './API'
import { withRouter } from "react-router-dom";

const accessToken = "pk.eyJ1IjoiYWF0YmMiLCJhIjoiY2p0ZWVzN2FhMTN1eTRibzc1MXBldnU0ciJ9.ZXzgcKbL9Jrymc0UlMw-Uw";
const style = "mapbox://styles/mapbox/streets-v9";

const Map = ReactMap({
  accessToken
});

const mapStyle = {
  height: '100vh',
  width: '100vw'
};





class App extends Component {
  state = {
    username: null
  }

  componentDidMount(){
    API.validate("users").then(data => {
      if (data.error) {
        this.props.history.push("/")
      } else {
        localStorage.setItem('token', data.token)
        this.setState({username: data.username})
      }
    })
  }


  render() {
    return (
      <div>
      <Nav />
      <FilterMinders currentUser={this.state.username}/>
      {/* <Map
        className="app-map"
        style={style}
        containerStyle={mapStyle}
        center={[-0.087587,51.5195]}
        zoom={[15]}
      >
      <Layer
      type="symbol"
      id="marker"
      // paint={{"circle-radius": 10}}
      layout={{ "icon-image": "marker-15" }}>
      <Feature coordinates={[-0.1275,51.50722]}/>
    </Layer>
    </Map> */}
      </div>
    );
  }
}

export default App;