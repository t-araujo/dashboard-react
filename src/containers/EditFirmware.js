import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../components/PageBase';
import {pink500, grey400} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { fetchBatch, editBatch } from '../actions/index';
import { reduxForm } from 'redux-form';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const styles = {
  floatingActionButton: {
    margin: 0,
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

class EditBatch extends Component {
  state = {
      firmware: {
      file: '',
      settings: '',
      type: '',
      versions: '',
      releaseNotes: ''
    },
    validation: {
      file: 'This field cannot be empty',
      settings: 'This field cannot be empty',
      type: 'This field cannot be empty',
      versions: 'This field cannot be empty',
      releaseNotes: 'This field cannot be empty'
    }
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchProduct(id);
  }

  handleChange(event, newValue) {
    event.persist();          
    this.setState((state) => state.firmware[event.target.name] = newValue);
  }
  
  handleDelete(event) {
    this.props.deleteBatch(event.target.XXX, () => {
      this.props.router.goBack();
    })
  }

  onSubmit() {
    this.props.editFirmware(this.state.product, () => {
      // this.props.router.goBack();
      this.props.history.push('/products');
    });
  }

  render (){
    let { firmware } = this.props;

    return (
      <PageBase title="Edit Firmware"
                navigation="Application / Edit Firmware">

          {/* <Link onClick={this.handleDelete} >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <Clear />
            </FloatingActionButton>
          </Link> */}

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
            floatingLabelText="File"
            name="file"
            value={firmware.file}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Status is required']}
            fullWidth={false}
            //set to blocked
          />
          <TextValidator
            floatingLabelText="Settings"
            name="settings"
            value={firmware.settings}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Settings is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Versions"
            name="versions"
            value={firmware.versions}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Version is required']}
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
