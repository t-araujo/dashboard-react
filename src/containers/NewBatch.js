import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
// import MenuItem from 'material-ui/MenuItem';
// import TextValidator from 'material-ui/TextValidator';
// import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import { connect } from 'react-redux';
import { createBatch } from '../actions/index';
import { reduxForm } from 'redux-form';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  }
};

const initialState = {
  error: null, // you could put error messages here if you wanted
  batch: {
      serialPart: "",
      description: "",
      productSerialPart: "",
      status: ""
  }
};

class NewBatch extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    // make sure the "this" variable keeps its scope
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

  handleChange(event, newValue) {
    event.persist();          
    this.setState((state) => state.batch[event.target.name] = newValue);
  }

  onSubmit() {
    this.props.createBatch(this.state.batch, () => {
      this.props.router.goBack();
    });
  }

  render (){
    // const { handleSubmit } = this.props;
    return (
      <PageBase title="New Batch"
                navigation="Application / New Batch">
          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            onError={
              errors => {
                console.log(errors)
            }}
          >

          <TextValidator
            floatingLabelText="Status"
            name="status"
            value={this.state.batch.status}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Status field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Product Serial Part"
            name="productSerialPart"
            value={this.state.batch.productSerialPart}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Product Serial Part field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Description"
            name="description"
            value={this.state.batch.description}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Description field is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Batch Serial Part"
            name="serialPart"
            value={this.state.batch.serialPart}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Batch Serial Part field is required']}
            fullWidth={false}
          />
          <div style={styles.toggleDiv}>
            <Toggle
              label="Disabled"
              labelStyle={styles.toggleLabel}
            />
          </div>

          <Divider/>

          <div style={styles.buttons}>
            <Link to="batches">
              <RaisedButton label="Back"/>
            </Link>

            <RaisedButton label="Save"
                          style={styles.saveButton}
                          type='submit'
                          primary={true}/>
          </div>
        </ValidatorForm>
      </PageBase>
    );
  }
}

export default reduxForm({
  form: 'NewBatch'
})(
  connect(null, { createBatch })(NewBatch)
);
