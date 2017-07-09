import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class NewBill extends Component {
	render () {
        var data = {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
                hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['Red','Yellow','Blue']
        };
		return (
            <div>
                <form>
                    <FieldGroup
                        id="formControlsTitle"
                        type="text"
                        label="Text"
                        placeholder="Enter text" />
                    <FieldGroup
                        id="formControlsDescription"
                        type="description"
                        label="Bill details"
                        placeholder="Enter more details about the bill" />
                </form>

    			<Pie data={data} />
            </div>
		);
	}
}

export default NewBill;