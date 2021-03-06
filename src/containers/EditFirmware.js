import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../components/PageBase';
import { grey400 } from 'material-ui/styles/colors';
import { editFirmware, fetchFirmware } from '../actions/index';
import { reduxForm } from 'redux-form';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const styles = {
  buttons: {
    float: 'right',
    marginTop: 30
  },
  floatingActionButton: {
    left: 'auto',
    margin: 0,
    position: 'fixed',
    right: 30,
    top: 130
  },
  inputs: {
    file: {
      width: '400px'
    }
  },
  saveButton: {
    marginLeft: 5
  },
  toggleDiv: {
    marginBottom: 5,
    marginTop: 40,
    maxWidth: 300
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  }
};

const InitialState = {
  firmware: {
    file: '',
    releaseNotes: '',
    settings: '',
    type: '',
    version: ''
  },
  validation: {
    file: 'This field cannot be changed',
    releaseNotes: 'This field cannot be empty',
    settings: 'This field cannot be changed',
    type: 'This field cannot be changed',
    versions: 'This field cannot be changed'
  }
};

class EditFirmware extends Component {

  constructor(props) {
    super(props);
    this.state = InitialState;
    this.state.firmware = this.props.firmware;

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.params;

    this.props.fetchFirmware(id);
  }

  handleChange(event, newValue) {
    event.persist();
    this.setState(state => state.firmware[event.target.name] = newValue);
  }

  onSubmit() {
    this.props.editFirmware(this.state.firmware, () => { this.props.router.goBack(); });
  }

  render() {
    let { firmware } = this.state;

    if (!firmware) {
      firmware = InitialState.firmware;
    }

    return (
      <PageBase title="Edit Firmware"
                navigation="Application / Edit Firmware">

          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            instantValidate={true}
            onError={
              errors => {
                console.log(errors);
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
            disabled={true}
            inputStyle={styles.inputs.file}
          />
          <TextValidator
            floatingLabelText="Settings"
            name="settings"
            value={`${firmware.settings.major}.${firmware.settings.minor}`}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Settings cannot be changed']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Version"
            name="version"
            value={firmware.version}
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

function mapStateToProps({ firmwares }, ownProps) {
  return { firmware: firmwares[ownProps.params.id] };
}

export default reduxForm({
  form: 'EditFirmware'
})(
  connect(mapStateToProps, { editFirmware, fetchFirmware })(EditFirmware)
);
