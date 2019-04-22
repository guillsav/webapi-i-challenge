import React, {Component} from 'react';

export default class AddContact extends Component {
  state = {
    name: '',
    bio: ''
  };

  onChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      bio: this.state.bio
    };

    this.props.addUser(newUser);

    this.setState({
      name: '',
      bio: ''
    });

    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            onChange={this.onChange}
            type="text"
            name="name"
            value={this.state.name}
          />
          <label htmlFor="bio">Bio</label>
          <input
            onChange={this.onChange}
            type="text"
            name="bio"
            value={this.state.bio}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}
