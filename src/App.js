import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import Data from './Data';
import './App.css';

class App extends Component  {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      csvData: [],
      loading: false,
      error: "",
      maleFemaleChart: {},
      carColoursChart: {},
      countriesChart: {} 
    };
  }

  
  handleReadCSV = (data) => {
    this.setState({ loading: true, csvData: data}, () => {
      this.setState({ loading: false });
      this.maleFemale(data);
      this.carColourByGender(data);
      this.distributionByCountry(data);
  })}

  handleOnError = (err) => {
    this.setState({ error: "Something went wrong!" });
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
  }

  maleFemale = (data) => {
    let allMales = 0;
    let allFemales = 0;
    
    data.data.forEach((row => {
      if (row.Gender === 'Male') {
        allMales++
      } else {
        allFemales++
      }
      
    }))

    let newMaleFemaleChart = {
      labels: ['Males', 'Females'],
      datasets: [
        {
          data: [allMales, allFemales],
          backgroundColor: 'rgba(235, 64, 52)',
          
        }
      ]
    };
    this.setState({ maleFemaleChart: newMaleFemaleChart })

  }

  carColourByGender = (data) => {
    //collect all female rows in one array
    let femalesData = [];
    let malesData = [];

    data.data.forEach((row => {
      if (row.Gender === 'Female') {
        femalesData.push(row);
      } else if (row.Gender === 'Male'){
        malesData.push(row);
      }

    }))

    // collect all colours from female array
    let femaleColoursArray = [];
    femalesData.map(obj => {
      return femaleColoursArray.push(obj["Car Color"]);
    })
    // use reduce method to count instances of each colour in an array
    let countedFemaleColours = femaleColoursArray.reduce(function (allColours, colour){
      if (colour in allColours) {
        allColours[colour]++
      } else {
        allColours[colour] = 1
      }
      return allColours
    }, {})
    
    //sorting keys alphabetically
    const sortedFemaleColours = Object.keys(countedFemaleColours).sort().reduce((acc, key) => ({
      ...acc, [key]: countedFemaleColours[key]
    }), {})
    

    // repeat the same for males data
    let malesColoursArray = [];
    malesData.map(obj => {
      return malesColoursArray.push(obj["Car Color"]);
    })
    // use reduce method to count instances of each colour in an array
    let countedMalesColours = malesColoursArray.reduce(function (allColours, colour) {
      if (colour in allColours) {
        allColours[colour]++
      } else {
        allColours[colour] = 1
      }
      return allColours
    }, {});

    //sorting keys alphabetically
    const sortedMalesColours = Object.keys(countedMalesColours).sort().reduce((acc, key) => ({
      ...acc, [key]: countedMalesColours[key]
    }), {})
    
    
    //collecting all colours into array for labeling radar chart
    const coloursLabels = Array.from(Object.keys(sortedMalesColours));
   
    
    // collecting data for the chart datasets
    const femaleColoursValue = Object.values(sortedFemaleColours);
    const maleColoursValue = Object.values(sortedMalesColours);
    

    let newCarColoursChart = {
      labels: coloursLabels,
      datasets: [
        {
          data: maleColoursValue,
          label: "Males",
          backgroundColor: 'rgba(0, 0, 204, 0.5)'},
        { data:femaleColoursValue,
          label: "Females",
          backgroundColor: 'rgba(235, 64, 52, 0.5)',
        }
      ]
    };
    this.setState({ carColoursChart: newCarColoursChart })

  }

  distributionByCountry(data) {
    let countries = [];
    data.data.forEach((row => {
      countries.push(row.Country)
    }))
    // calculating number of people per country
    let countedCountries = countries.reduce(function (allCountries, country) {
      if (country in allCountries) {
        allCountries[country]++
      } else {
        allCountries[country] = 1
      }
      return allCountries
    }, {});
    // preparing data for chart 
    const countriesLabels = Array.from(Object.keys(countedCountries));
    const countriesNum = Array.from(Object.values(countedCountries));
    
    // generating random colours for countries' labels
    function getRandomRgb() {
      let r = Math.floor(Math.random() * 256);  
      let g = Math.floor(Math.random() * 256);  
      let b = Math.floor(Math.random() * 256);  
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    let randomRgb = [];
    for (let i = 0; i < countriesLabels.length; i++) {
      randomRgb.push((getRandomRgb()));
    }

    let newCountriesChart = {
      labels: countriesLabels,
      datasets: [
        {
          data: countriesNum,
          backgroundColor: randomRgb
        }
      ]
    };
    this.setState({ countriesChart: newCountriesChart })
  }


    render() {
      return (
        <div className="app">
          <div className="wrapper">
          <header>
            <h1>Welcome!</h1>
            <h2>Click on the button to upload CSV file:</h2>
            <button onClick={this.handleImportOffer}>Import</button>
          </header>
          <CSVReader
            onFileLoaded={this.handleReadCSV}
            inputRef={this.fileInput}
            style={{ display: 'none' }}
            onError={this.handleOnError}
            configOptions={{ 
              header: true,
              }}
          />
            <Data
              maleFemaleData = {this.state.maleFemaleChart}
              carColours = {this.state.carColoursChart}
              countriesData={this.state.countriesChart}
            />
          </div>
        </div>
      )
    }
}

export default App;
