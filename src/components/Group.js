import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { Button, Form, Modal, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      {/* <ControlLabel>{label}</ControlLabel> */}
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Group extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showNewGroup: false
		}

		this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
		this.setNewGroupVisible = this.setNewGroupVisible.bind(this);
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

	setNewGroupVisible(e) {
		this.setState({ showNewGroup: !this.state.showNewGroup });
	}

	render() {
		return (
			<div className="user-functions-buttons">
                <Button bsStyle="default" onClick={this.setNewGroupVisible}>+ group</Button>
                <Modal show={this.state.showNewGroup} onHide={this.setNewGroupVisible}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new group</Modal.Title>
                    </Modal.Header>
                   
                    <Form inline>
                        <FieldGroup
                          id="formControlsText"
                          type="text"
                          placeholder="Group title" />
                        <FieldGroup
                          id="formControlsText"
                          type="text"
                          placeholder="Group description" />
                        <ReactTags tags={this.state.tags}
                            suggestions={this.state.suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag} 
                            placeholder={'Add members'} 
                            classNames = {{tagInputField: 'form-control'}}/>
                    </Form>
                    
                    <Modal.Footer>
                        <Button bsStyle="default" onClick={this.setNewGroupVisible}>Cancel</Button>
                        <Button bsStyle="primary" type="submit" onClick={this.getData}>Save group</Button>
                  </Modal.Footer>
                </Modal>
            </div>
		);
	}
}

export default Group;