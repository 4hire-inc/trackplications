import React, { Fragment } from 'react';
import HeaderDisplay from '@components/HeaderDisplay';
import ContentDisplay from '@components/ContentDisplay';
import AddAppDisplay from '@components/AddAppDisplay';

const AddAppPage = () => {
  return (
    <Fragment>
      <HeaderDisplay />
      <ContentDisplay>
        <AddAppDisplay />
      </ContentDisplay>
    </Fragment>
  );
};

export default AddAppPage;
