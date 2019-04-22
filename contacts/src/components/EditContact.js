import React, {Component} from 'react';

export default class AddContact extends Component {
  state = {
    user: {
      name: this.props.selectedUser.name ? this.props.selectedUser.name : '',
      bio: this.props.selectedUser.bio ? this.props.selectedUser.bio : ''
    }
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [e.target.name]: e.target.value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.editUser(this.state.user);

    this.setState({
      user: {
        name: '',
        bio: ''
      }
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
            value={this.state.user.name}
          />
          <label htmlFor="bio">Bio</label>
          <input
            onChange={this.onChange}
            type="text"
            name="bio"
            value={this.state.user.bio}
          />
          <input type="submit" value="Edit" />
        </form>
      </div>
    );
  }
}
