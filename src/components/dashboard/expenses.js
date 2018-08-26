import React,{Component} from 'react';
import moment from 'moment';
import numeral from 'numeral';
import * as actions from '../../actions';
import {connect} from 'react-redux';
class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: ''
    }
  }

  removeExpense(id,month,eid) {
        actions.removeExpense(id,month,eid);
        this.props.dispatch(actions.fetchRecords(id,month));

  }

  renderExpenses(expenses) {

    if(expenses) {
      if(expenses.length > 0) {
      return expenses.reverse().map((item,index)=> {
        return(

          <div className="expenses-container" key={index}>
          <div className="symbol"><i className={`fa fa-${item.category}`} /></div>
          <div className="detail">
          <div className="description"><strong>{item.description}</strong></div>
          { item.notes ? <div className="notes"> {item.notes} </div> : ''}
          <div className="date">{moment(item.date).format('MMM Do YYYY')}</div>
          <div className="remove" onClick={()=>this.removeExpense(this.props.id,this.props.month,item.id)}>Remove</div>

          </div>

          <div className="total-amount">{numeral(item.amount).format('0,0')}</div>

          </div>
        )
      });
    }else if (expenses.length === 0) {
      return(
        <div className="empty-data"><i className="fa fa-edit"/> &nbsp; No Expense Made Yet...</div>
      )
    }

    }else {
      return (
        <div className="loading"><i className="fa fa-spin fa-spinner" /></div>
      )
    }
  }

  renderTotalExpenses(expenses) {

    if(expenses) {
      let total = 0;
      expenses.map((item)=>{
        total = total + item.amount;
      })
      return(
        <div className="totalexp-card">
        <div className="month"><strong>{this.props.month}</strong></div>.
        <div className="total"><div className="amount">{numeral(total).format('0,0')}</div> <div>Expenses</div></div>
        </div>
      )
    }
  }

  render() {

    return(
      <div className="container" >
        {this.renderTotalExpenses(this.props.expenses)}
        <div>
        {this.renderExpenses(this.props.expenses)}
        </div>
        </div>

    )
  }
}

export default connect(null)(Expenses);
