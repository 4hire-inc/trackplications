export type HeaderProps = {
  userState: {
    userId: string;
    userName: string;
  }
};

export type ApplicationType = {
  company: string,
  position: string,
  location: string,
  notes: string
};

export type AppsSummaryPropsType = {
  appsList: (ApplicationType)[],
  setActiveApp: any
};

// export type AppsListState = {
  
// }