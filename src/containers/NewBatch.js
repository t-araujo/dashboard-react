import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
// import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
// import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import AutoComplete from 'material-ui/AutoComplete';

import { filter, omit, map, uniq } from 'lodash';
import { connect } from 'react-redux';
import { createBatch, fetchAllHardware } from '../actions/index';
import { reduxForm } from 'redux-form';
import { AutoCompleteValidator, ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
  error: null,
  batch: {
      serialPart: "",
      description: "",
      hardware: "",
      status: ""
  }
};

class NewBatch extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.state.data = uniq(map(this.props.hardware, 'revision'));

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.handleHardwareUpdateInput = this.handleHardwareUpdateInput.bind(this);
    this.handleHardwareNewRequest = this.handleHardwareNewRequest.bind(this);
    this.handleStatusUpdateInput = this.handleStatusUpdateInput.bind(this);
    this.handleStatusNewRequest = this.handleStatusNewRequest.bind(this);
}

  handleChange = (event, newValue) => {
    event.persist();
    this.setState((state) => state.batch[event.target.name] = newValue);
  }

  onSubmit = () => {
    const { batch } = this.state;
    if (batch.status === 'OPEN') {
      batch.status = "1";
    } else {
      batch.status = "0";
    }

    const result = filter(this.props.hardware, (item => {
      if (item.revision === batch.hardware) {
        return item.id;
      }
    }));

    batch.hardwareId = result[0].id;

    this.props.createBatch(omit(batch, ['hardware']), () => {
      this.props.router.goBack();
    });
  }

  handleHardwareUpdateInput = (searchText) => this.setState((state) => state.batch.hardware = searchText);

  handleHardwareNewRequest = () => {
    this.setState((state) => state.batch.hardware = state.batch.hardware !== '' ? state.batch.hardware : '' );
  };

  handleStatusUpdateInput = (searchText) => this.setState((state) => state.batch.status = searchText);

  handleStatusNewRequest = () => {
    this.setState((state) => state.batch.status = state.batch.status !== '' ? state.batch.status : '' );
  };

  componentDidMount() {
    this.props.fetchAllHardware();
  }

  render (){
    return (
      <PageBase title="New Batch"
                navigation="Application / New Batch">

          <ValidatorForm
            ref="NewBatch"
            onSubmit={this.onSubmit}
            onError={
              errors => {
            }}
          >

          <AutoCompleteValidator
            hintText="Status"
            name="status"
            value={this.state.batch.status}
            searchText={this.state.batch.status}
            onUpdateInput={this.handleStatusUpdateInput}
            onNewRequest={this.handleStatusNewRequest}
            dataSource={['OPEN', 'CLOSED']}
            filter={(searchText, key) => (key.toLowerCase().indexOf(searchText) !== -1)}
            openOnFocus={true}
            validators={['required']}
            errorMessages={['Status field is required']}
          />

          <AutoCompleteValidator
            hintText="Type the name of hardware"
            name="hardware"
            value={this.state.batch.hardware}
            searchText={this.state.batch.hardware}
            onUpdateInput={this.handleHardwareUpdateInput}
            onNewRequest={this.handleHardwareNewRequest}
            dataSource={this.state.data}
            filter={(searchText, key) => (key.toLowerCase().indexOf(searchText) !== -1)}
            openOnFocus={true}
            validators={['required']}
            errorMessages={['Hardware field is required']}
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
                          type="submit"
                          primary={true}/>
          </div>
        </ValidatorForm>
      </PageBase>
    );
  }
}

NewBatch.propTypes = {
  router: PropTypes.func
};

function mapStateToProps({ hardware }) {
  return { hardware };
}

export default reduxForm({
  form: 'NewBatch'
})(
  connect(mapStateToProps, { fetchAllHardware, createBatch })(NewBatch)
);
