import React,{ Component } from 'react';
import {Field,reduxForm} from 'redux-form';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import * as actions from '../../actions';
import Header from '../header';
import {withRouter} from 'react-router-dom';

class AddExpense extends Component {

  constructor(props) {
    super(props);

      this.state = {
        date: moment(),
        focused: false
      }
  }


renderInput(field) {
const className = field.meta.touched && field.meta.error ? `form-group has-error` : 'form-group';
  return(
    <div className={className}>

    <input placeholder={`Enter ${field.label}`} type={field.type} {...field.input}/>
    <div className="error">
    {field.meta.touched && field.meta.error ? field.meta.error : ''}
    </div>
    </div>
    )
}

renderSelect(field) {
const className =  field.meta.touched && field.meta.error ? `form-group has-error` : 'form-group';
  return(
    <div className={className} >


    <select {...field.input}>
    <option value="">Please Select Category</option>
    <option value="gas-pump">Fuel</option>
    <option value="bolt">Electricity</option>
    <option value="coffee">Coffee</option>
    <option value="glass-martini">Outing</option>
    <option value="mobile-alt">Mobile</option>
    <option value="motorcycle">Bike</option>
    <option value="utensils">Food</option>
    <option value="plane-departure">Flight</option>
    <option  value="car">Car</option>
    <option value="truck">Transport</option>
    <option value="medkit">Health</option>
    <option value="graduation-cap">Education</option>
    <option value="shopping-bag">Shopping</option>
    <option value="birthday-cake">Birthday</option>
    <option value="child">Party</option>
    <option value="tshirt">Cloth</option>
    <option value="bus-alt">Bus</option>
    <option value="hands-helping">Payment</option>
    <option value="beer">Drinks</option>

    <option value="question">Other</option>
    </select>
    <div className="error">
    {field.meta.touched && field.meta.error ? field.meta.error : ''}
    </div>
    </div>
    )
}

handleForm(values) {
  const date = this.state.date;
  values.date = date.format();
  const month = date.format('MMMM');
  values.amount = parseInt(values.amount,10);
  actions.addExpense(this.props.user.id,month,values);
    this.props.history.push('/dashboard');

}

  render() {

    return(
      <div className="add-expense">
      <Header/>

      <form className="add-expense-form" onSubmit={this.props.handleSubmit((e) => this.handleForm(e))}>

      <Field type="text" label="Description" name="description" component={this.renderInput} />


      <Field label="Category" name="category" component={this.renderSelect} />

      <Field type="number" label="Amount" name="amount" component={this.renderInput} />


      <SingleDatePicker
        date={this.state.date} // momentPropTypes.momentObj or null
        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })}
        isOutsideRange={()=>false}
        numberOfMonths={1} // PropTypes.func.isRequired
        id="date" // PropTypes.string.isRequired,
      />

      <Field type="text" label="Notes(If Any)" name="notes" component={this.renderInput} />

      <button className="save-btn" disabled={this.props.pristine} type="submit"> Save </button>
      </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if(!values.description) {
    errors.description = "Description is required!";
  }

  if(!values.category) {
    errors.category = "Category is required!";
  }

   if(!parseInt(values.amount,10)) {
     errors.amount = "Amount is required!";
   }

   if(parseInt(values.amount,10) < 1) {
     errors.amount = "Amount must be greater than zero(0) !";
   }



  return errors;
}

export default reduxForm({
  validate,
  form: 'ADD_EXPENSE'
})(withRouter(AddExpense));
