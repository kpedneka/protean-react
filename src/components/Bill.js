import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, FormControl, Form} from 'react-bootstrap';

import { writeBill } from '../actions/Bills';

function FieldGroup({ id, ...props }) {
  return (
    <FormGroup controlId={id}>
      {/* <ControlLabel>{label}</ControlLabel> */}
      <FormControl {...props} />
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
            data: {datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }], labels: []},
            suggestions: ["kunal", "adi", "ria", "amer"],
            showNewBill: false
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setNewBillVisible = this.setNewBillVisible.bind(this);
        this.writeBill = this.writeBill.bind(this);
        this.updateTags = this.updateTags.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
    }

    handleDelete(i) {
        this.setState(oldState => {
            var tags = oldState.tags.slice();
            tags.splice(i, 1);

            // handle each person's amount, i -th location was deleted
            var data = Object.assign({}, oldState.data);
            data.datasets[0].backgroundColor.splice(i, 1);
            data.datasets[0].hoverBackgroundColor.splice(i, 1);
            data.datasets[0].data.splice(i, 1);
            data.labels.splice(i, 1);
            return { tags: tags, data: data }
        })
    }
 
    handleAddition(tag) {
        // update state 
        this.setState(oldState => {
            var tags = oldState.tags.slice();
            var data = Object.assign({}, oldState.data);
            // iterate tags and ensure no repetitions
            tags.push({
                id: tags.length,
                text: tag,
                amount: oldState.amount/(tags.length + 1)
            });
            // generate random color and then update pie char data
            const color = this.getRandomColor();
            data.datasets[0].backgroundColor.push(color);
            data.datasets[0].hoverBackgroundColor.push(color);
            data.datasets[0].data.push(oldState.amount/(tags.length));
            data.labels.push(tag);
            return { tags: tags, data : data };
        })
    }

    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // update amount for each tag based on equal distribution
    updateTags(amount, length) {
        this.setState(oldState => {
            const share = Number.parseFloat(amount)/length;
            console.log('share is now ', share);
            var tags = oldState.tags;
            // data is the whole data object for this.state.data
            var data = Object.assign({}, oldState.data);
            tags.forEach((tag, index) => {
                tag.amount = share
                data.datasets[0].data[index] = share;
            })
            return { tags: tags, data: data }
        })
    }

    handleChange(e) {
        // set the state based on the input
        if (e.target.id === 'amount') {
            // update each person's amount
            console.log('amount is ', e.target.value)
            this.setState({[e.target.id] : e.target.value}, this.updateTags(e.target.value, this.state.tags.length));
        } else {
            this.setState({[e.target.id] : e.target.value }, console.log(this.state, e.target.value));
        }
    }

    setNewBillVisible(e) {
        this.setState({showNewBill: !this.state.showNewBill})
    }

    writeBill(e) {
        console.log(this.state);
        // dispatch action to write the bill
        this.props.writeBill(this.state.title, this.state.description, this.state.amount, this.state.tags);
        this.setNewBillVisible();
        // reset the state to initial state
    }

    render () {
		return (
            <div className="user-functions-buttons">
                <Button bsStyle="default" onClick={this.setNewBillVisible}>+ bill</Button>
                <Modal show={this.state.showNewBill} onHide={this.setNewBillVisible}>
                    
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new bill</Modal.Title>
                    </Modal.Header>
                    
                    <Form>
                        <FieldGroup
                          id="title"
                          type="text"
                          value={this.state.title}
                          onChange={this.handleChange}
                          placeholder="Bill title" />
                       
                        <FieldGroup
                          id="description"
                          type="text"
                          onChange={this.handleChange}
                          placeholder="Bill description" />
                      
                        <FieldGroup
                          id="amount"
                          type="text"
                          value={this.state.amount}
                          onChange={this.handleChange}
                          placeholder="Bill amount" />
                      
                        <ReactTags tags={this.state.tags}
                            suggestions={this.state.suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={false} 
                            placeholder={'Type and press enter to add members'} 
                            autofocus={false}
                            classNames = {{tagInputField: 'form-control'}}/>
                    </Form>
                    
                    <Pie data={this.state.data} redraw />
                   
                    <Modal.Footer>
                        <Button bsStyle="default" onClick={this.setNewBillVisible}>Cancel</Button>
                        <Button bsStyle="primary" type="submit" onClick={this.writeBill}>Save bill</Button>
                  </Modal.Footer>
                </Modal>
            </div>
		);
	}
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
        bills: state.bills.bills
    }
}

function mapDispatchToProps(dispatch) {
    return {
        writeBill: (title, description, amount, tags) => { dispatch(writeBill(title, description, amount, tags)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bill);