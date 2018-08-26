import React,{ Component } from 'react';


import Header from '../header';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';

import Expenses from './expenses';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment().format('MMMM')
    }
  }

  componentDidMount() {
    if(this.props.user) {
       const month = moment().format('MMMM');
      this.props.dispatch(actions.fetchRecords(this.props.user.id,month));
      }
  }

  switchMonth(e) {


    this.setState({month: e.target.value});
    this.props.dispatch(actions.fetchRecords(this.props.user.id,e.target.value));
  }



render() {
  let id = '';
    if(this.props.user) {
      id = this.props.user.id;
    }
    return(
    <div>
    <Header/>
    <div className="choose-month">
    <div className="months">
    <label>Choose Month:</label>
    <select defaultValue={this.state.month} onChange={(e)=> {this.switchMonth(e)}}>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
    <option value="October">October</option>
    <option value="November">November</option>
    <option value="December">December</option>
    </select>
    </div>
    </div>
    <Expenses id={id} month={this.state.month} expenses={this.props.expenses} />
    </div>
  )
}
}

function mapStateToProps(state) {

  return {
    expenses: state.expenses
  }
}



export default connect(mapStateToProps)(Dashboard);
