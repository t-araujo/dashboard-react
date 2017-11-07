import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../components/PageBase';
import { grey400 } from 'material-ui/styles/colors';
import { editSoftware, fetchSoftware } from '../actions/index';
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
  software: {
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

class EditSoftware extends Component {

  constructor(props) {
    super(props);
    this.state = InitialState;
    this.state.software = this.props.software;

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.params;

    this.props.fetchSoftware(id);
  }

  handleChange(event, newValue) {
    event.persist();
    this.setState(state => state.software[event.target.name] = newValue);
  }

  onSubmit() {
    this.props.editSoftware(this.state.software, () => { this.props.router.goBack(); });
  }

  render() {
    let { software } = this.state;

    if (!software) {
      software = InitialState.software;
    }

    return (
      <PageBase title="Edit Software"
                navigation="Application / Edit Software">

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
            floatingLabelText="File Name"
            name="file"
            value={software.file}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['File cannot be changed']}
            fullWidth={false}
            disabled={true}
            inputStyle={styles.inputs.file}
          />
          <TextValidator
            floatingLabelText="Release Notes"
            name="releaseNotes"
            value={software.releaseNotes}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Release notes is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Version"
            name="version"
            value={software.version}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Version cannot be changed']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Type"
            name="type"
            value={software.architecture}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['Type cannot be changed']}
            fullWidth={false}
          />

          <div style={styles.buttons}>
            <Link to="/software">
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

function mapStateToProps({ softwares }, ownProps) {
  return { software: softwares[ownProps.params.id] };
}

export default reduxForm({
  form: 'EditSoftware'
})(
  connect(mapStateToProps, { editSoftware, fetchSoftware })(EditSoftware)
);
