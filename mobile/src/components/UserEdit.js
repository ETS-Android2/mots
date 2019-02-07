import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { initialize } from 'redux-form';

import UserForm, { USER_FORM_NAME } from './UserForm';
import { saveUser } from '../actions';
import {
  MANAGE_USERS_AUTHORITY,
  MANAGE_INCHARGE_USERS_AUTHORITY,
  hasAuthority,
} from '../utils/authorization';
import formsStyles from '../styles/formsStyles';
import getContainerStyle from '../utils/styleUtils';
import apiClient from '../utils/api-client';
import commonStyles from '../styles/commonStyles';

const { formHeader } = formsStyles;
const { lightThemeText } = commonStyles;

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.onSubmitCancel = this.onSubmitCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    hasAuthority(MANAGE_USERS_AUTHORITY, MANAGE_INCHARGE_USERS_AUTHORITY).then((result) => {
      if (!result) {
        Actions.home();
      }
      this.fetchUser();
    });
  }

  onSubmitCancel() {
    this.setState({ loading: false });
    Actions.users();
  }

  onSubmit(values) {
    Actions.modalConfirm({
      message: 'Are you sure to edit User?',
      onConfirm: () => {
        const valuesToSend = values;
        valuesToSend.roles = [{ id: values.roleId }];
        this.setState({ loading: true });
        this.props.saveUser(valuesToSend, result => this.onSubmitSuccess(result));
      },
    });
  }

  onSubmitSuccess(result) {
    this.setState({ loading: false });
    if (result) {
      Actions.modalSuccess({
        message: 'User has been updated',
        onClose: () => { Actions.users(); },
      });
    }
  }

  fetchUser() {
    const url = `/api/user/${this.props.userId}`;
    apiClient.get(url)
      .then((response) => {
        if (response) {
          response.roleId = response.roles[0].id;
          response.password = '';
          this.props.initialize(USER_FORM_NAME, response);
        }
      });
  }

  render() {
    return (
      <View style={getContainerStyle()}>
        <ScrollView alwaysBounceVertical={false}>
          <Text style={[formHeader, lightThemeText]}>Edit User</Text>
          <UserForm
            loading={this.state.loading}
            onSubmit={this.onSubmit}
            onSubmitCancel={this.onSubmitCancel}
            isPasswordRequired={false}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, { saveUser, initialize })(UserEdit);

UserEdit.propTypes = {
  saveUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  initialize: PropTypes.func.isRequired,
};
