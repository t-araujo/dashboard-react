import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {white, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';

const menuProps = {
  desktop: true
};

export default class SearchBox extends Component {
  state = {
    dataSource: ['Hardwares', 'Batches', 'Firmwares', 'Software'],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Search here"
          dataSource={this.state.dataSource}
          filter={AutoComplete.fuzzyFilter}
          underlineShow={false}
          menuProps={menuProps}
          fullWidth={true}
        />
      </div>
    );
  }
}