import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from 'react-chartjs-2';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, FormControl, HelpBlock, Form } from 'react-bootstrap';

import { getUsers } from '../actions/User';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      {/* <ControlLabel>{label}</ControlLabel> */}
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Bill extends Component {
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
        this.getData = this.getData.bind(this);
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
        this.setState({showNewBill: !this.state.showNewBill})
    }

    getData(e) {
        console.log(ReactDOM.findDOMNode(this.refs.formControl))
    }

    render () {
        var data = {
            datasets: [{
                // data is the amount that each person owes
                data: [33, 33, 33],
                // background color corresponds to each user
                backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
                // shows a popover with information about the share (of the bill)
                hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['Red','Yellow','Blue']
        };
		return (
            <div className="user-functions-buttons">
                <Button bsStyle="default" onClick={this.setNewBillVisible}>+ bill</Button>
                <Modal show={this.state.showNewBill} onHide={this.setNewBillVisible}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new bill</Modal.Title>
                    </Modal.Header>
                    <Form inline>
                        <FieldGroup
                          id="formControlsTitle"
                          type="text"
                          placeholder="Bill title" />
                        <FieldGroup
                          id="formControlsDescription"
                          type="text"
                          placeholder="Bill description" />
                        <FieldGroup
                          id="formControlsAmount"
                          type="text"
                          placeholder="Bill amount" />
                        <ReactTags tags={this.state.tags}
                            suggestions={this.state.suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag} 
                            placeholder={'Add members'} 
                            classNames = {{tagInputField: 'form-control'}}/>
                    </Form>
                    
                    <Pie data={data} />
                    <Modal.Footer>
                        <Button bsStyle="default" onClick={this.setNewBillVisible}>Cancel</Button>
                        <Button bsStyle="primary" type="submit" onClick={this.getData}>Save bill</Button>
                  </Modal.Footer>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bill);