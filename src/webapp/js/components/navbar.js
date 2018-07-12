import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './header';

import SideBar from './sidebar';
import { signoutUser } from '../actions';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.onSignout = this.onSignout.bind(this);
  }

  onSignout(event) {
    this.props.signoutUser();
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <Header
          signoutUser={this.onSignout}
          toggleShowMenuSmart={this.props.toggleShowMenuSmart}
          hideMenuSmart={this.props.hideMenuSmart}
        />
        <SideBar
          signoutUser={this.onSignout}
          showMenuSmart={this.props.showMenuSmart}
          hideMenuSmart={this.props.hideMenuSmart}
        />
      </nav>
    );
  }
}

export default connect(null, { signoutUser })(Navbar);

Navbar.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  showMenuSmart: PropTypes.bool,
  toggleShowMenuSmart: PropTypes.func.isRequired,
  hideMenuSmart: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  showMenuSmart: false,
};
