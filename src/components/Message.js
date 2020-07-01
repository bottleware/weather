// @ts-check
import React from 'react';
import PropTypes from 'prop-types';

 /**
 * A component that displays a message.
 * @component
 * @param {object} props
 * @param {string} props.message a message to display
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
