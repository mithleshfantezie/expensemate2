import React,{Component} from 'react';

import * as actions from '../../actions';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false
    }
  }


  renderLogout(user) {
    if(user) {
      if(user.id) {
        return(
          <div className="nav-item logout-btn"  onClick={() => this.logout()}><i className="fa fa-sign-out-alt"/>Logout</div>
        )
      }

    }
  }

  logout() {
    actions.logout();
  }

  toggleSwitch(e) {
    if(this.state.openMenu) {
      return this.setState({openMenu: false})
    }
    this.setState({openMenu: true});

  }

  renderProfile(user) {
    if(user) {
      return(
        <div className="profile"  style={{background:`url(${user.image})`}}>
        <div className="profile-item">
        <div className="profile-image item" style={{background:`url(${user.image})`}}></div>
        <div className="item">Welcome !!</div>
        <div className="item"><strong>{user.name}</strong></div>
        </div>
        </div>
      )
    }
  }

  renderMenuBtn() {
    if(this.props.location.pathname !== '/add/expense') {
      return <div className="menu" onClick={(e)=>this.toggleSwitch(e)}>&#8801;</div>
    }else {
    return <div className="go-back"><Link to="/dashboard"><i className="fa fa-chevron-left" /> </Link></div>

    }
  }

  render() {

    const className =  this.state.openMenu ? `nav open` : `nav`;
    return(
    <div>
    <header className="header">
    {this.renderMenuBtn()}
      <div className="logo" >EXPENSEMATE</div>

    </header>
    <div className={className}>

      {this.renderProfile(this.props.user)}

      <Link to="/add/expense"><div className="nav-item"><i className="fa fa-edit"/>Add Expense</div></Link>
      {this.renderLogout(this.props.user)}
    </div>
    </div>
  )
}
}

function mapStatetoProps(state) {

  return {
    user: state.user
  }
}

export default connect(mapStatetoProps)(withRouter(Header));
