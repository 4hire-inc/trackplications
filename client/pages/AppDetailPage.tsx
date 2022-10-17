import React, { Fragment } from 'react';
import HeaderDisplay from '@components/HeaderDisplay';
import ContentDisplay from '@components/ContentDisplay';
import AppDetailDisplay from '@components/AppDetailDisplay';

const AppDetailPage = () => {
  return (
    <Fragment>
      <HeaderDisplay />
      <ContentDisplay>
        <AppDetailDisplay />
      </ContentDisplay>
    </Fragment>
  );
};

export default AppDetailPage;
