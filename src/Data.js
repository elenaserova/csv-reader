import React from 'react';
import { Bar, Pie} from 'react-chartjs-2';

class Data extends React.Component {

  render() {
    return (
      <div>
      <Bar
        data={this.props.maleFemaleData}
        height={400}
        options={{ maintainAspectRatio: false,
          title: {
            display: true,
            text: "Males vs Females"
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
      
      </div>
    )}
}

      export default Data;