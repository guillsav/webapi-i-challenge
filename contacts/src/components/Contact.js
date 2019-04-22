import React from 'react';

const Contact = props => {
  return (
    <div className="Contact">
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  );
};

export default Contact;
