import React from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import ContactsList from './components/ContactsList';

import './App.css';
import Contact from './components/Contact';

class App extends React.Component {
  state = {
    users: []
  };
  componentDidMount() {
    axios.get('http://localhost:5000/api/users').then(res => {
      console.log(res.data);
      this.setState({
        users: res.data
      });
    });
  }
  onDelete = id => {
    this.setState({
      users: this.state.users.filter(user => {
        return user.id !== id;
      })
    });
  };
  render() {
    return (
      <div className="App">
        <Link to="/users">Contacts</Link>
        <ContactsList users={this.state.users} onDelete={this.onDelete} />
        <Route exact path="/users" component={ContactsList} />
        <Route exact path="/users/:id" component={Contact} />
      </div>
    );
  }
}

export default App;
