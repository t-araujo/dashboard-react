import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
// import MenuItem from 'material-ui/MenuItem';
// import TextValidator from 'material-ui/TextValidator';
// import SelectField from 'material-ui/SelectField';
// import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
// import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { fetchBatch, editBatch } from '../actions/index';
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
  batch: {

  },
  validation: {
    devName: "This field cannot be empty",
    brandName: "This field cannot be empty",
    serialPart: "This field cannot be empty",
    description: "This field cannot be empty",
    hardwareRevision: "This field cannot be empty"
  }
};

class EditBatch extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.batch;
    // make sure the "this" variable keeps its scope
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.params;
    this.props.fetchProduct(id);
  }

  handleChange(event, newValue) {
    event.persist();          
    this.setState((state) => state.batch[event.target.name] = newValue);
  }
  
  handleDelete(event) {
    this.props.deleteBatch(event.target.XXX, () => {
      this.props.router.goBack();
    })
  }

  onSubmit() {
    this.props.editProduct(this.state.product, () => {
      // this.props.router.goBack();
      this.props.history.push('/products');
    });
  }

  render (){
    let { batch } = this.props;
    
    if (!batch) {
      batch = initialState.batch;
    }

    return (
      <PageBase title="Edit Batch"
                navigation="Application / Edit Batch">

          <Link onClick={this.handleDelete} >
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
            floatingLabelText="Status"
            name="status"
            value={batch.status}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Status is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Description"
            name="description"
            value={batch.description}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Description is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Serial Part"
            name="serialPart"
            value={batch.serialPart}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Serial Part is required']}
            fullWidth={false}
          />

          <div style={styles.buttons}>
            <Link to="/batches">
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

function mapStateToProps({ batches }, ownProps) {
  return { batch: batches[ownProps.params.id] };
}

export default reduxForm({
  form: 'EditBatch'
})(
  connect(mapStateToProps, { editBatch, fetchBatch })(EditBatch)
);
