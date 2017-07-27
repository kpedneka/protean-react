import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { ControlLabel, FormGroup, FormControl, HelpBlock, Modal, Button } from 'react-bootstrap';

import { getUsers } from '../actions/User';

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
	constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            amount: 0,
            tags: [],
            suggestions: [],
            showNewBill: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.setNewBillVisible = this.setNewBillVisible.bind(this);
    }

    componentDidMount() {
        getUsers();
        this.setState({suggestions: this.props.users})
    }

    handleDelete(i) {
        var tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        console.log(this.state);
    }
 
    handleAddition(tag) {
        var tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
        console.log(this.state);
    }
 
    handleDrag(tag, currPos, newPos) {
        var tags = this.state.tags;
        // mutate array 
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
        // re-render 
        this.setState({ tags: tags });
    }

      setNewBillVisible(e) {
    e.preventDefault();
    this.setState({showNewBill: !this.state.showNewBill})
  }

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
                <ReactTags tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} 
                    placeholder={'add members'} />
                <Pie data={data} />
            </div>
		);
	}
}

function mapStateToProps(state) {
    return {
        users: state.user.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => { dispatch(getUsers) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBill);