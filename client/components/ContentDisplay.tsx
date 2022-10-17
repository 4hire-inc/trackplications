import React from 'react';

const ContentDisplay = (props: any) => { // update "any" when props are better defined
  return (
    <div>{props.children}</div>
  );
};

export default ContentDisplay;
