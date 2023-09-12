import React from 'react';

const MessageParser = ({ children, actions }) => {
  const {checker} = children.props.state;
  const parse = (message) => {
      if(checker === "name"){
        children.props.setState((prev)=>({
          ...prev,
          user: {...children.props.state.user, name:message}
        }))

        actions.afterNameMessage();
      }

      if(checker === "age"){
        actions.afterAgeMessage();
      }
  };
  
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions, 
        });
      })}
    </div>
  );
};

export default MessageParser;