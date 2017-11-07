import React, { Component } from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import moment from 'moment';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { fetchBatches } from '../actions';

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
    status: {
      width: '20%'
    },
    serialPart: {
      width: '20%'
    },
    description: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  }
};

class ListBatches extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [1]
    };
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  handleRowSelection(selectedRows) {
    this.setState({
      selected: selectedRows
    });
  }

  componentDidMount() {
    this.props.fetchBatches();
  }

  isSelected(index) {
    return this.state.selected.indexOf(index) !== -1;
  }

  render() {
    return (
      <PageBase title="Batches Page"
                navigation="Application / Batches Page">
        <div>
          <Link to="/newBatch" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.serialPart}>Serial Part</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.status}>Status</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.description}>Description</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.created}>Created</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(this.props.batches, item =>
                <TableRow selected={this.isSelected(item.id)} key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.serialPart}>{item.serialPart}</TableRowColumn>
                  <TableRowColumn style={styles.columns.status}>{item.status}</TableRowColumn>
                  <TableRowColumn style={styles.columns.description}>{item.description}</TableRowColumn>
                  <TableRowColumn style={styles.columns.created}>{moment(item.createdAt).format('MMM Do YY')}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/editBatch/${item.id}`}>
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

function mapStateToProps({ batches }) {
  return { batches };
}

export default connect(mapStateToProps, { fetchBatches })(ListBatches);
