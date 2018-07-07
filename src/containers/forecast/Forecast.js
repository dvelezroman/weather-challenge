import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";
import _ from 'lodash';
import {API_KEY} from './constants';

// COMPONENTS
import {ForecastCard, RecentSearchs} from './index';

class Forecast extends Component {

    state = {
        showRecentSearchs: false,
        data: null,
        error: null,
        searchQuery: '',
        unit: 'F',
    };

    render() {
        let {error, searchQuery} = this.state;

        return (
            <div className="App">
                <div className="Forecast">
                    <h3>Welcome to ForecastApp!</h3>
                    {this.renderUnitToggler()}

                    <div className="Forecast__searchbox">
                        <input className="Forecast__searchbox-input" value={searchQuery} {...this.getFieldProps()}  />
                    </div>

                    <RecentSearchs onSelect={this.fetchForecast} />

                    <div className="Forecast__main">
                        {this.renderForecast()}
                        {(error) ? this.renderError() : null}
                    </div>
                </div>
            </div>
        );
    }

    renderUnitToggler = (unit) => {
        return [
            <button onClick={() => {this.setUnit('C')}}>°C</button>,
            <button onClick={() => {this.setUnit('F')}}>°F</button>
        ];
    }

    setUnit = (unit) => {
        this.setState({ unit, });
    }

    renderForecast = () => {
        let {data, unit} = this.state;
        return (data) ? <ForecastCard unit={unit} data={data} /> : null;
    }

    renderError = () => {
        let {error,} = this.state;
        let {classes,} = this.props;
        return (
            <div className="Forecast__errorResults">
                {error}
            </div>
        );
    }

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value, });
    }

    getFieldProps () {
        return {
            placeholder: 'Enter City name and press enter.',
            fullWidth: true,
            onChange: this.handleInputChange,
            onKeyPress: (event) => {
                let query = event.target.value;

                if (event.key === 'Enter' && query.length > 2) {
                    this.fetchForecast(event.target.value);
                }
            },
        }
    }

    fetchForecast = (query) => {
        this.setState({showRecentSearchs: false, searchQuery: query});
        this.saveNewSearch(query);

        fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&units=imperial&q= ${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod && data.cod==='404') {
                    this.setState({data:null, error: data.message })
                } else {
                    this.setState({data, error: null, })
                }
            });
    }

    saveNewSearch = (query) => {
        let items = JSON.parse(localStorage.getItem('recentSearchs')) || [];
        let exist = _.find(items, function(o) { return o===query });

        if (!exist) {
            items.push(query);
            localStorage.setItem('recentSearchs', JSON.stringify(items));
        }
    }
}

export default Forecast;
