import React from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

import './App.css';

class App extends React.Component {
  state = {
    users: [],
    selectedUser: null
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));
  }
  onDelete = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() =>
        this.setState({
          users: this.state.users.filter(user => {
            return user.id !== id;
          })
        })
      )
      .catch(err => console.log(err.message));
  };

  addUser = user => {
    axios
      .post('http://localhost:5000/api/users', user)
      .then(res =>
        this.setState({
          users: [...this.state.users, res.data]
        })
      )
      .catch(err => console.log(err.message));
  };

  targetUser = id => {
    const user = this.state.users.find(user => {
      return user.id === id;
    });

    this.setState({
      selectedUser: user
    });
  };

  editUser = user => {
    const id = this.state.selectedUser.id;
    console.log(user);

    axios
      .put(`http://localhost:5000/api/users/${id}`, user)
      .then(res =>
        this.setState({
          users: [...this.state.users, res.data]
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <NavLink exact to="/users">
          Home
        </NavLink>
        <NavLink exact to="/users/add">
          Add Contacts
        </NavLink>
        <Home
          users={this.state.users}
          onDelete={this.onDelete}
          targetUser={this.targetUser}
        />

        <Route path="/users" component={Home} />
        <Route
          exact
          path="/users/add"
          render={props => <AddContact {...props} addUser={this.addUser} />}
        />
        <Route
          exact
          path="/users/edit"
          render={props => (
            <EditContact
              {...props}
              selectedUser={this.state.selectedUser}
              editUser={this.editUser}
            />
          )}
        />
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
