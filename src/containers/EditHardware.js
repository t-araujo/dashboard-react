import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {grey400, pink500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { fetchHardware, editHardware } from '../actions/index';
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

const initialState = {
  thisHardware: {
      devName: "",
      developmentName: "",
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

class EditHardware extends Component {
  constructor(props) {
    super (props);
    this.state = initialState;
    this.state.thisHardware = this.props.thisHardware;

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.fetchHardware(id);
  }

  handleChange(event, newValue) {
    event.persist();
    this.setState((state) => state.thisHardware[event.target.name] = newValue);
  }

  onSubmit() {
    const { brandName, description, developmentName: devName, id, revision, serialPart } = this.state.thisHardware;

    this.props.editHardware({ brandName, description, devName, id, revision, serialPart }, () => {
      this.props.router.goBack();
    });
  }

  render (){
    let { thisHardware } = this.props;

    if (!thisHardware) {
      thisHardware = initialState.thisHardware;
    }

    return (
      <PageBase title="Edit hardware"
                navigation="Application / Edit hardware">

          <ValidatorForm
            ref="form"
            onSubmit={this.onSubmit}
            instantValidate={true}
            onError={
              errors => {
            }}
          >

          <TextValidator
            floatingLabelText="Brand Name"
            name="brandName"
            value={thisHardware.brandName}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Development Name"
            name="devName"
            value={thisHardware.developmentName}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Revision"
            name="revision"
            value={thisHardware.revision}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />
          <TextValidator
            floatingLabelText="Description"
            name="description"
            value={thisHardware.description}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={true}
          />
          <TextValidator
            floatingLabelText="Serial Part"
            name="serialPart"
            value={thisHardware.serialPart}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth={false}
          />

          <div style={styles.buttons}>
            <Link to="/hardwares">
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

function mapStateToProps({ hardware }, ownProps) {
  return { thisHardware: hardware[ownProps.params.id] };
}

export default reduxForm({
  form: 'EditHardware'
})(
  connect(mapStateToProps, { editHardware, fetchHardware })(EditHardware)
);
