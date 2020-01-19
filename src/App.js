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
      maleFemaleChart: {} 
    };
  }

  
  handleReadCSV = (data) => {
    console.log(data.data[0].Country);
    this.setState({ loading: true, csvData: data}, () => {
      this.setState({ loading: false });
      console.log(this.state.csvData);
      this.maleFemale(data);
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

  carColourByGender = () => {
    // collect all the colours into array
    // remove duplicates
    // check num of males that own car of each colour
    // check num of females that own car of each colour
  }



  

    render() {
      return (
        <div className="app">
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
          />
        
          
        </div>
      )
    }
}

export default App;
