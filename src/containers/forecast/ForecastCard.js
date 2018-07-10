import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";
import PropTypes from 'prop-types';

// COMPONENTS
import {ForecastCardMap} from './index';

class ForecastCard extends Component {

    render() {
        let {classes, data} = this.props;

        return (
            <div className="ForecastCard">
                <div className="ForecastCard__info">
                    <ForecastCardMap lat={data.coord.lat} lng={data.coord.lon} name={data.name} />
                    <span>{`${data.name} (${data.sys.country})`}</span>
                    <span className="ForecastCard__info-main">{this.getTemp(data.main.temp)}</span>
                    <span>{`${data.main.pressure} hPa`}</span>
                    <span>{`${data.main.humidity} % Humidity`}</span>
                    <span>
                        {` ${this.getTemp(data.main.temp_min)} / ${this.getTemp(data.main.temp_max)}`}
                    </span>
                </div>
            </div>
        );
    }

    getTemp (tempValue) {
        let {unit} = this.props;
        let result = '';

        if (unit==='C') {
            result = `${this.convertToCelcius(tempValue)} °C`;
        } else {
            result = `${tempValue} °F`;
        }

        return result;
    }

    convertToCelcius (fahrenheit) {
        return Math.floor((fahrenheit-32) / 1.8);
    }
}

ForecastCard.propTypes = {
    data: PropTypes.shape({}),
    unit: PropTypes.oneOf(['C', 'F']),
};

ForecastCard.defaultProps = {
    data: {},
    unit: 'C',
};

// CSS in JS approach with Material UI Next (withStyles lib)
const styles = {
    input: {
        padding: 20,
        // color: '#FFFFFF',
        fontSize: 22,
    },
    searchBox: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.7)',
        flexDirection: 'column',
    }
};


export default withStyles(styles)(ForecastCard);
