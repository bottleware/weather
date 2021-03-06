import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
  const { message } = props;
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
