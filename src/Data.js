import React from 'react';
import { Bar, Radar, Pie} from 'react-chartjs-2';
import './App.css';

class Data extends React.Component {

  render() {
    return (
      <div className="charts">
        <Bar
          data={this.props.maleFemaleData}
          height={100}
          options={{ maintainAspectRatio: false,
            title: {
              display: true,
              text: "Males vs Females",
              fontSize: 30
          },
          legend: {
            display: false
          }, 
          layout: {
            padding: {
              left: 50,
              right: 50,
            }}
          }}
        />
        <Radar 
          data={this.props.carColours}
          options={{
            legend: {
              display: true,
              labels: {
                fontSize: 18
              },
            },
            scale: {
              angleLines: {
                display: false
              },
              ticks: {
              suggestedMin: 1,
              suggestedMax: 40,
              backdropColor: 'rgba(245, 245, 235, 1)'
              }
            },
            title: {
              display: true,
              text: "Car Colour Preference by Gender",
              fontSize: 30
            },
            layout: {
              padding: {
                top: 50,
                bottom: 50,
              }
            },
          }}
        />
        <div className="special">
          <Pie 
            data={this.props.countriesData}
            options={{
              responsive: true,
              title: {
                display: true,
                text: "Number of people by country",
                fontSize: 30
              },
              maintainAspectRatio: false,
            }} 
          /> 
        </div>
    </div>
    )}
}

      export default Data;