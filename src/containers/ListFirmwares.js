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
import { fetchFirmwares } from '../actions';

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
    created: {
      width: '20%'
    },
    file: {
      width: '20%'
    },
    settings: {
      width: '20%'
    },
    versions: {
      width: '20%'
    },
    type: {
      width: '20%'
    },
    releaseNotes: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  }
};

class ListFirmwares extends Component {
  state = {
    selected: [1],
  };


  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows,
    });
    console.log(this.state);
  }

  componentDidMount() {
    this.props.fetchFirmwares();
  }

  render (){
    return (
      <PageBase title="Firmwares Page"
                navigation="Application / Firmwares Page">
        <div>
          <Link to="/newFirmware" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.file}>File Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.settings}>Settings</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.versions}>Versions</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.type}>Type</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.releaseNotes}>Type</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.created}>Created</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(this.props.firmwares ,item =>
                <TableRow selected={this.isSelected(item.id)} key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.file}>{item.file}</TableRowColumn>
                  <TableRowColumn style={styles.columns.settings}>{item.settings}</TableRowColumn>
                  <TableRowColumn style={styles.columns.versions}>{item.versions}</TableRowColumn>
                  <TableRowColumn style={styles.columns.type}>{item.type}</TableRowColumn>
                  <TableRowColumn style={styles.columns.releaseNotes}>{item.releaseNotes}</TableRowColumn>
                  <TableRowColumn style={styles.columns.created}>{item.createdAt}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/editFirmware/${item.id}`}>
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

function mapStateToProps({ firmwares }) {
  return { firmwares };
}

export default connect(mapStateToProps, { fetchFirmwares })(ListFirmwares);
