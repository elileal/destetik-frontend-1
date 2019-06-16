import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoicGFoZmVycmVpcmEiLCJhIjoiY2p3ejMxYzV6MTNvZjQ5czN3aDA3ajBsbSJ9.boSTASlJzHLbvrgNL1Uq5g';
class Map extends Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.props.geoLocation,
      zoom: 16
    });
    const marker = new mapboxgl.Marker({
      color: '#d46da9'
    })
      .setLngLat(this.props.geoLocation)
      .addTo(map);
  }

  render() {
    return (
      <div
        className="row m-4"
        ref={el => (this.mapContainer = el)}
        style={{ minHeight: 350 }}
      />
    );
  }
}

export default Map;
