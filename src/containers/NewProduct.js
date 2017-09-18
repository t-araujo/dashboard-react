import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import { connect } from 'react-redux';
import { createProduct } from '../actions/index';
import { reduxForm } from 'redux-form';

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
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].            
    this.setState((state) => state.product[event.target.name] = newValue);
  }

  onSubmit() {
    console.log(this.state.product)
    this.props.createProduct(this.state.product, () => {
      this.props.history.push('/');
    });
  }

  render (){
    const { handleSubmit } = this.props;

    return (
      <PageBase title="New Product"
                navigation="Application / New Product">
        <form style={styles.formWidth} onSubmit={handleSubmit(this.onSubmit)}>

          <TextField
            hintText="Brand Name"
            floatingLabelText="Brand Name"
            name="brandName"
            onChange={this.handleChange}
            fullWidth={false}
          />
          <TextField
            hintText="Development Name"
            floatingLabelText="Development Name"
            name="devName"
            fullWidth={false}
          />
          <TextField
            hintText="Hardware Revision"
            floatingLabelText="Hardware Revision"
            name="hardwareRevision"
            fullWidth={false}
          />
          <TextField
            hintText="Description"
            floatingLabelText="Description"
            name="description"
            fullWidth={true}
          />
          <TextField
            hintText="Serial Part"
            floatingLabelText="Serial Part"
            name="serialPart"
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
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>

            <RaisedButton label="Save"
                          style={styles.saveButton}
                          type='submit'
                          primary={true}/>
          </div>
        </form>
      </PageBase>
    );
  }
}

export default reduxForm({
  form: 'NewProduct'
})(
  connect(null, { createProduct })(NewProduct)
);
