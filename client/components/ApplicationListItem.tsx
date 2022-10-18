import React from 'react';

const ApplicationListItem = (props: any) => { // update "any" when props are better defined
  // props: appInfo
  return (
    <li>{props.appInfo.company}</li>
  );
};

export default ApplicationListItem;
