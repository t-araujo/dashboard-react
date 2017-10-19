import React, { Component } from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';

import { map } from 'lodash';
import { connect } from 'react-redux';
import { fetchAllSoftware } from '../actions';

const styles = {
  editButton: {
    fill: grey500
  },
  columns: {
    created: {
      width: '15%'
    },
    download: {
      width: '07%'
    },
    edit: {
      width: '07%'
    },
    file: {
      width: '20%'
    },
    id: {
      width: '10%'
    },
    releaseNotes: {
      
      width: '30%'
    },
    settings: {
      width: '10%'
    },
    version: {
      width: '10%'
    },
    type: {
      width: '10%'
    }
  }
};

class ListSoftware extends Component {
  state = {
    selected: [1],
    software : {}
  };


  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows,
    });
  }

  componentDidMount() {
    this.props.fetchAllSoftware();
  }

  render (){
    return (
      <PageBase title="Software"
                navigation="Application / Software">
        <div>

          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.file}>File Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.version}>Version</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.releaseNotes}>Release notes</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.created}>Created</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.download}>Download</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(this.props.software ,item =>
                <TableRow selected={this.isSelected(item.id)} key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.file}>{item.file}</TableRowColumn>
                  <TableRowColumn style={styles.columns.version}>{item.version}</TableRowColumn>
                  <TableRowColumn style={styles.columns.releaseNotes}>{item.releaseNotes}</TableRowColumn>
                  <TableRowColumn style={styles.columns.created}>{item.createdAt}</TableRowColumn>
                  <TableRowColumn style={styles.columns.download}>
                    <Link className="button" to={`/downloadSoftware/${item.id}`}>
                        <FloatingActionButton zDepth={0}
                                              mini={true}
                                              backgroundColor={grey200}
                                              iconStyle={styles.editButton}>
                          <FileFileDownload  />
                        </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/editSoftware/${item.id}`}>
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

function mapStateToProps({ software }) {
  return { software };
}

export default connect(mapStateToProps, { fetchAllSoftware })(ListSoftware);
