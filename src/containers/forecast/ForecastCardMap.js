import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";
import PropTypes from 'prop-types';

// COMPONENTS
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

class ForecastCardMap extends Component {

    render() {
        let {lat, lng, name} = this.props;

        return (
            <div style={{ height: '200px', width: '100%' }}>
                <GoogleMapReact center={{lat: lat, lng: lng,}} defaultZoom={8}>
                    <Marker lat={59.955413} lng={30.337844} text={name} />
                </GoogleMapReact>
            </div>
        );
    }
}
ForecastCardMap.propTypes = {
    lat: PropTypes.string,
    lng: PropTypes.string,
    name: PropTypes.string,
};

export default ForecastCardMap;
