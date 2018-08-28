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
      month: moment().format('MMMM'),
      searchTerm: ''
    }
  }

  componentWillMount() {
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

    let expenses;
    let sError;

    if(this.state.searchTerm !== '' ) {
      const searchTerm = String(this.state.searchTerm).toLowerCase();
      expenses = [];
      const data = this.props.expenses;
      if(data.length > 0 ) {
        data.map((item) => {
          if(String(item.description).toLowerCase().includes(searchTerm) || String(item.notes).toLowerCase().includes(searchTerm) ){
            expenses.push(item);
          }
        })
      }
      sError = `Unable to find the Match for ''${this.state.searchTerm}''`;
    }else if (this.state.searchTerm === '') {
        expenses = this.props.expenses;
         sError = 'No Expenses Made Yet...';
    }
    return(
    <div>
    <Header/>
    <div className="choose-month">
    <div className="months">
    <label>Choose Month: <i className="fa fa-calendar-alt"/></label>

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
    <div className="input"> <input type="search" placeholder=" Try ''Food'' " value={this.state.searchTerm} onChange={(e)=>this.setState({searchTerm: e.target.value})} /> <i className="fa fa-search"/> </div>
    </div>

    </div>
    <Expenses error={sError} id={id} month={this.state.month} expenses={expenses} />
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
