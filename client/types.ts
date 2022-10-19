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
	app_id: string;
	user_id: string;
	company: string;
	location: string;
	position: string;
	notes: string;
	status_id: string;
	offer_id: string;
	modified_at: string;
	status_name: string;
	status_rank: number;
	status_modifed_at: string;
	// data from offers table present if offer_id is present
	salary?: number;
	sign_on_bonus?: number;
	start_date?: string;
	offer_notes?: string;
	offer_modified_at?: string;
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
	appsList: AppsList;
	updateAppsList: any;
};

export type EditAppProps = {
	activeApp: ActiveApp;
	appsList: AppsList;
	updateAppsList: any;
	setActiveApp: any;
};