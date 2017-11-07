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
import { fetchAllHardware } from '../actions';

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
    name: {
      width: '20%'
    },
    brandName: {
      width: '20%'
    },
    revision: {
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

class ListHardware extends Component {

  constructor(props) {
    super (props);
    
    this.state = {
      selected: [1]
    };
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentWillMount(){
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

  // componentDidMount() {
  //   setInterval(() => this.props.fetchProducts(), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(setInterval());
  // }

  render (){
    return (
      <PageBase title="Hardware Page"
                navigation="Application / Hardware Page">
        <div>
          <Link to="/newHardware" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.brandName}>Brand Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.revision}>revision</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.description}>Description</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(this.props.hardware ,item =>
                <TableRow selected={this.isSelected(item.id)} key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item.developmentName}</TableRowColumn>
                  <TableRowColumn style={styles.columns.brandName}>{item.brandName}</TableRowColumn>
                  <TableRowColumn style={styles.columns.revision}>{item.revision}</TableRowColumn>
                  <TableRowColumn style={styles.columns.description}>{item.description}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/editHardware/${item.id}`}>
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

function mapStateToProps({ hardware }) {
  return { hardware };
}

export default connect(mapStateToProps, { fetchAllHardware })(ListHardware);
