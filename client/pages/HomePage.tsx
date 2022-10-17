import React, { Fragment } from 'react';
import HeaderDisplay from '@components/HeaderDisplay';
import ContentDisplay from '@components/ContentDisplay';
import AppSummaryDisplay from '@components/AppSummaryDisplay';

const HomePage = () => {
  return (
    <Fragment>
      <HeaderDisplay />
      <ContentDisplay>
        <AppSummaryDisplay />
      </ContentDisplay>
    </Fragment>
  );
};

export default HomePage;
