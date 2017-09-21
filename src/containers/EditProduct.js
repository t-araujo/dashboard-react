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

import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { fetchProduct, editProduct } from '../actions/index';
import { reduxForm } from 'redux-form';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 30,
    top: 130,
    left: 'auto',
    position: 'fixed',
  },
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

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    // make sure the "this" variable keeps its scope
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.params;
    this.props.fetchProduct(id);
  }

  handleChange(event, newValue) {
    event.persist();          
    this.setState((state) => state.product[event.target.name] = newValue);
    this.props.product[event.target.name] = newValue;
  }

  onSubmit() {
    this.props.editProduct(this.state.product, () => {
      // this.props.router.goBack();
      this.props.history.push('/products');
    });
  }

  render (){
    const { handleSubmit } = this.props;
    let { product } = this.props;
    
    if (!product) {
      product = initialState.product;
    }

    return (
      <PageBase title="Edit Product"
                navigation="Application / Edit Product">

          <Link to="/newProduct" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <Clear />
            </FloatingActionButton>
          </Link>

          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            instantValidate={true}
            onError={
              errors => {
                console.log(errors)
            }}
          >



          <TextValidator
            floatingLabelText="Brand Name"
            name="brandName"
            value={product.brandName}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Development Name"
            name="devName"
            value={product.developmentName}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Hardware Revision"
            name="hardwareRevision"
            value={product.hardwareRevision}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Description"
            name="description"
            value={product.description}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Serial Part"
            name="serialPart"
            value={product.serialPart}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />

          <div style={styles.buttons}>
            <Link to="/products">
              <RaisedButton label="Back"/>
            </Link>

            <RaisedButton label="Save"
                          style={styles.saveButton}
                          type="submit"
                          primary={true}/>
          </div>
        </ValidatorForm>
      </PageBase>
    );
  }
}

function mapStateToProps({ products }, ownProps) {
  return { product: products[ownProps.params.id] };
}

export default reduxForm({
  form: 'EditProduct'
})(
  connect(mapStateToProps, { editProduct, fetchProduct })(EditProduct)
);
