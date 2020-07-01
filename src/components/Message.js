import React from 'react';
import PropTypes from 'prop-types';

 /**
 * Creates the Message component.
 * @component
 */
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
