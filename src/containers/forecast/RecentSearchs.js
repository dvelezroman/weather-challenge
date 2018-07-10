import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";
import _ from 'lodash';


// COMPONENTS


class RecentSearchs extends Component {
    state = {
        items: [],
    };

    componentDidMount () {
        this.setState({items: this.getItems()})
    }

    render() {
        let {classes} = this.props;
        let items = this.getItems();

        return items && (
            <div className={classes.recentSearch}>
                {items.map(this.renderItem)}
            </div>
        );
    }

    renderItem = (item, index) => {
        let {classes} = this.props;

        return (
            <div className={classes.searchBoxItem} key={index}>
                <span onClick={()=>this.props.onSelect(item)}>{item}</span>
                <span className={classes.searchBoxItemDelete} onClick={()=>this.deleteItem(item)}>(X)</span>
            </div>
        );
    }

    getItems () {
        let items = JSON.parse(localStorage.getItem('recentSearchs'));
        return (items && items.length) ? items.reverse().slice(0, 5) : [];
    }

    deleteItem = (item) => {
        let items = this.getItems();

        _.remove(items, function(o) { return o === item; });

        this.setState({items});
        localStorage.setItem('recentSearchs', JSON.stringify(items));
    }
}

// CSS in JS approach with Material UI Next (withStyles lib)
const styles = {
    recentSearch: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    searchBoxItem: {
        margin: 5,
        fontSize: 12,
        backgroundColor: '#F5f5f5',
        padding: '3px 5px',
        borderRadius: 6,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#d5e7fd',
        }
    },
    searchBoxItemDelete: {
        marginLeft: 5,
        '&:hover': {
            color: '#F00',
            cursor: 'pointer',
        }
    }
};


export default withStyles(styles)(RecentSearchs);
