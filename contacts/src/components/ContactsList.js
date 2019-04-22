import React from 'react';
import Contact from './Contact';

const ContactsList = props => {
  return (
    <div>
      {props.users.map(user => {
        return (
          <Contact
            key={user.id}
            id={user.id}
            name={user.name}
            bio={user.bio}
            onDelete={props.onDelete}
          />
        );
      })}
    </div>
  );
};

export default ContactsList;
