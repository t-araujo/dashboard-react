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
      file: 'This field cannot be changed',
      settings: 'This field cannot be changed',
      type: 'This field cannot be changed',
      versions: 'This field cannot be changed',
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
  
  onSubmit() {
    this.props.editFirmware(this.state.firmware, () => {
      // this.props.router.goBack();
      this.props.history.push('/firmwares');
    });
  }

  render (){
    let { firmware } = this.props;

    return (
      <PageBase title="Edit Firmware"
                navigation="Application / Edit Firmware">

          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            instantValidate={true}
            onError={
              errors => {
            }}
          >

          <TextValidator
            floatingLabelText="File"
            name="file"
            value={firmware.file}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['File cannot be changed']}
            fullWidth={false}
            //set to blocked
          />
          <TextValidator
            floatingLabelText="Settings"
            name="settings"
            value={firmware.settings}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Settings cannot be changed']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Versions"
            name="versions"
            value={firmware.versions}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Version cannot be changed']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Type"
            name="type"
            value={firmware.type}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Type cannot be changed']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Release Notes"
            name="releaseNotes"
            value={firmware.releaseNotes}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Release notes is required']}
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
