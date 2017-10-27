import React, { Component } from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';

import { map } from 'lodash';
import { connect } from 'react-redux';
import { fetchDevices } from '../actions';

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '10%'
    },
    serial: {
      width: '20%'
    },
    state: {
      width: '20%'
    },
    liveDate: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  }
};

class ListDevices extends Component {

  constructor(props) {
    super (props);
    
    this.state = {
      selected: [1]
    };
  }

  componentWillMount(){
    this.props.fetchDevices();
  }

  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows,
    });
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  // componentDidMount() {
  //   setInterval(() => this.props.fetchProducts(), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(setInterval());
  // }

  render (){
    const devices = this.props.devices;
    return (
      <PageBase title="Devices Page"
                navigation="Application / Devices Page">
        <div>
          <Link to="/newDevice" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.serial}>Serial</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.state}>State</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.liveDate}>LiveDate</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(devices ,item =>
                <TableRow selected={this.isSelected(item.id)} key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.serial}>{item.serial}</TableRowColumn>
                  <TableRowColumn style={styles.columns.state}>{item.state}</TableRowColumn>
                  <TableRowColumn style={styles.columns.liveDate}>{item.liveDate}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/editDevice/${item.id}`}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>    
        </div>
      </PageBase>
    );
  }
}

function mapStateToProps({ devices }) {
  return { devices };
}

export default connect(mapStateToProps, { fetchDevices })(ListDevices);
