import React, { Fragment } from 'react';
import HeaderDisplay from '@components/HeaderDisplay';
import ContentDisplay from '@components/ContentDisplay';
import EditAppDisplay from '@components/EditAppDisplay';

const EditAppPage = () => {
  return (
    <Fragment>
      <HeaderDisplay />
      <ContentDisplay>
        <EditAppDisplay />
      </ContentDisplay>
    </Fragment>
  );
};

export default EditAppPage;
