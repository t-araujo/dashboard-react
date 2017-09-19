import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
// import TextValidator from 'material-ui/TextValidator';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import { connect } from 'react-redux';
import { createProduct } from '../actions/index';
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
  product: {
      devName: "",
      brandName: "",
      serialPart: "",
      description: "",
      hardwareRevision: ""
  },
  validation: {
    devName: "This field cannot be empty",
    brandName: "This field cannot be empty",
    serialPart: "This field cannot be empty",
    description: "This field cannot be empty",
    hardwareRevision: "This field cannot be empty"
  }
};

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    // make sure the "this" variable keeps its scope
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

  handleChange(event, newValue) {
    event.persist();          
    this.setState((state) => state.product[event.target.name] = newValue);
  }

  onSubmit() {
    this.props.createProduct(this.state.product, () => {
      console.log(this.props);
      this.props.router.goBack();
    });
  }

  render (){
    const { handleSubmit } = this.props;

    return (
      <PageBase title="New Product"
                navigation="Application / New Product">
          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            onError={
              errors => {
                console.log(errors)
            }}
          >

          <TextValidator
            floatingLabelText="Brand Name"
            name="brandName"
            value={this.state.product.brandName}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Brand Name field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Development Name"
            name="devName"
            value={this.state.product.devName}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Development Name field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Hardware Revision"
            name="hardwareRevision"
            value={this.state.product.hardwareRevision}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Hardware Revision field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Description"
            name="description"
            value={this.state.product.description}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Description field is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Serial Part"
            name="serialPart"
            value={this.state.product.serialPart}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Serial Part field is required']}
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
            <Link to="products">
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
  form: 'NewProduct'
})(
  connect(null, { createProduct })(NewProduct)
);
