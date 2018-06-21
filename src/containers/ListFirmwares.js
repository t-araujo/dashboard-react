import React, { Component } from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import moment from 'moment';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { fetchFirmwares } from '../actions';

const styles = {
  editButton: {
    fill: grey500
  },
  floatingActionButton: {
    bottom: 20,
    left: 'auto',
    margin: 0,
    position: 'fixed',
    right: 20,
    top: 'auto'
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

const initialState = {
  selected: [1],
  firmwares: {}
};

class ListFirmwares extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [1]
    };
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows
    });
  }

  componentDidMount() {
    this.props.fetchFirmwares();
  }

  render() {
    return (
      <PageBase title="Firmwares Page"
                navigation="Application / Firmwares Page">
        <div>
          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.file}>File Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.settings}>Settings</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.version}>Version</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.type}>Type</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.releaseNotes}>Release notes</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.created}>Created</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.download}>Download</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(this.props.firmwares, item =>
                <TableRow selected={this.isSelected(item.id)} key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.file}>{item.file}</TableRowColumn>
                  <TableRowColumn style={styles.columns.settings}>{`${item.settings.major}.${item.settings.minor}`}</TableRowColumn>
                  <TableRowColumn style={styles.columns.version}>{item.version}</TableRowColumn>
                  <TableRowColumn style={styles.columns.type}>{item.type}</TableRowColumn>
                  <TableRowColumn style={styles.columns.releaseNotes}>{item.releaseNotes}</TableRowColumn>
                  <TableRowColumn style={styles.columns.created}>{moment(item.createdAt).format('MMM Do YY')}</TableRowColumn>
                  <TableRowColumn style={styles.columns.download}>
                    <Link className="button" to={`/downloadFirmware/${item.id}`}>
                        <FloatingActionButton zDepth={0}
                                              mini={true}
                                              backgroundColor={grey200}
                                              iconStyle={styles.editButton}>
                          <FileFileDownload />
                        </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/editFirmware/${item.id}`}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate />
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
