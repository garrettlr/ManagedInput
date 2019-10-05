import React, { Component } from 'react';
import { AutoComplete } from '../components';
const airlines = [
  'United Airlines',
  'American Airlines',
  'Delta Air Lines', //sic, they actually spell it this way
  'Southwest Airlines',
  'SpaceX' // for the rich people
]

// this doesn't need to be a promise, but the AutoComplete component was designed to work
// with an asynchronous source, so we're gonna fake one here.
// we've skipped reject because this is bare bones.
const fetchAirlines = text => new Promise(resolve => resolve(airlines.filter(a => a.startsWith(text))));

const AirlineProvider = Child => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selections: [],
        err: ''
      }
    }

    handleErr = err => {
      if (!err) return;
      this.setState({ err }, () => setTimeout(() => this.setState({ err: '' }), 3000));
    }

    render() {
      return (
        <AutoComplete 
          fetchItems={fetchAirlines}
          handleSelection={selections => this.setState({ selections })}
          handleErr={this.handleErr}
          selections={this.state.selections}
          err={this.state.err}
          placeholder="Airline(s) booked"
        />
      )
    }

  }
}

export default AirlineProvider;