import React from 'react';
import {Link} from 'react-router-dom';

const Contact = props => {
  return (
    <div className="Contact">
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
      <Link onClick={() => props.targetUser(props.id)} to="/users/edit">
        Edit
      </Link>
    </div>
  );
};

export default Contact;
