export type UserInfo = {
	userId: string;
	userName: string;
};

export type HeaderProps = {
	userInfo: UserInfo;
};

export type ActiveAppProps = {
	activeApp: ActiveApp;
};

export type AuthProps ={
	updateUserInfo: any;
}

export type ActiveApp = {
	[key: string] : string
};

export type AppAttributeProps = {
	key: number;
	appAttribute: AppAttributeType;
};

export type AppAttributeType = [string, string | number];

export type AppsList = ActiveApp[];

export type AppsListProps = {
	appsList: AppsList;
	activeApp: ActiveApp;
	updateAppsList: any;
};

export type AppsSummaryType = {
	appsList: AppsList;
	setActiveApp: any;
	updateAppsList: any;
};

export type ApplicationListItemType = {
	appInfo: ActiveApp;
	setActiveApp: any;
};

export type EditAppProps = {
	activeApp: ActiveApp;
	appsList: AppsList;
	updateAppsList: any;
	setActiveApp: any;
};