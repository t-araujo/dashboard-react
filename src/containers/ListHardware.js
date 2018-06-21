import React, { Component } from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import DataTables from 'material-ui-datatables';

import { isEmpty, orderBy, slice } from 'lodash';
import { connect } from 'react-redux';
import { fetchAllHardware } from '../actions';

const TABLE_COLUMNS = [
  {
    key: 'product',
    label: 'Product ID',
    sortable: true
  },
  {
    key: 'brand',
    label: 'Product Brand name',
    sortable: true
  },
  {
    key: 'codename',
    label: 'Code name',
    sortable: true
  },
  {
    key: 'revision',
    label: 'Product revision',
    sortable: true
  }
];

const initialState = {
  hardware: [],
  page: 1,
  selected: [1]
};

class ListHardware extends Component {

  constructor(props) {
    super(props);

    this.state = initialState;
    // this.state.hardware = this.props.hardware;
    console.log(this.props.hardware)
    this.state.hardware = isEmpty(this.props.hardware) ? [] : this.props.hardware;

    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllHardware();
  }

  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows,
    });
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  handleFilterValueChange = (value) => {
    // your filter logic
  }

  handleNextPageClick = event => {
    console.log('====================================');
    console.log(this.state.page);
    console.log('====================================');
    this.setState({
      page: this.state.page + 1
    });
    // this.setState({
    //   hardware: slice(this.props.hardware, value)
    // });
  }

  handlePreviousPageClick = value => {
    console.log('====================================');
    console.log(this.state.page, value);
    console.log('====================================');
    this.setState({
      page: this.state.page - 1
    });
  }

  handleSortOrderChange = (key, order) => {
    this.setState({
      hardware: orderBy(this.props.hardware, key, order)
    });
  }
  handleRowSizeChange = value => {
    
  }
  render() {
    return (
      <DataTables
        title='Hardware List'
        height={'auto'}
        headerToolbarMode={'filter'}
        selectable={true}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={this.state.hardware}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onNextPageClick={this.handleNextPageClick}
        onPreviousPageClick={this.handlePreviousPageClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onFilterValueChange={this.handleFilterValueChange}
        onSortOrderChange={this.handleSortOrderChange}
        onRowSizeChange={this.handleRowSizeChange}
        page={this.state.page}
        rowSize={10}
        showCheckboxes={true}
        showHeaderToolbar={true}
        showRowHover={true}
        showRowSizeControls={true}
        count={this.state.hardware.length}
      />
    );
  }
}

function mapStateToProps({ hardware }) {
  let temp;

  if (hardware === {}) {
    temp = { hardware: [] };
  } else {
    temp = { hardware };
  }

  return temp;
}

export default connect(mapStateToProps, { fetchAllHardware })(ListHardware);
