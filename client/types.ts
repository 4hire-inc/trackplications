export type HeaderProps = {
	userState: {
		userId: string;
		userName: string;
	};
};

// export type AppsListState = {

// }
export type ActiveAppProps = {
	activeApp: ActiveApp;
};

export type ActiveApp = {
	id: string;
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
