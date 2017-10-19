import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
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

class NewProduct extends Component {
  state = {
    error: null, // you could put error messages here if you wanted
    product: {
        devName: "",
        brandName: "",
        serialPart: "",
        description: "",
        revision: ""
    },
    validation: {
      devName: "This field cannot be empty",
      brandName: "This field cannot be empty",
      serialPart: "This field cannot be empty",
      description: "This field cannot be empty",
      revision: "This field cannot be empty"
    }
  };

  handleChange = (event, newValue) => {
    event.persist();          
    this.setState((state) => state.product[event.target.name] = newValue);
  }

  onSubmit = () => {
    this.props.createProduct(this.state.product, () => {
      this.props.router.goBack();
    });
  }

  render (){
    // const { handleSubmit } = this.props;
    return (
      <PageBase title="New Product"
                navigation="Application / New Product">
          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            onError={
              errors => {
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
            name="revision"
            value={this.state.product.revision}
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

NewProduct.propTypes = {
  createProduct: PropTypes.func,
  router: PropTypes.object
};

export default reduxForm({
  form: 'NewProduct'
})(
  connect(null, { createProduct })(NewProduct)
);
