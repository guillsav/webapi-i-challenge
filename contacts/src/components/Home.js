import React from 'react';
import ContactsList from './ContactsList';

const Home = props => {
  return (
    <div>
      {props.users && (
        <ContactsList
          users={props.users}
          onDelete={props.onDelete}
          targetUser={props.targetUser}
        />
      )}
    </div>
  );
};

export default Home;
