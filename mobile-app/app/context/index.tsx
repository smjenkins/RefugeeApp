import React, { useState, createContext } from 'react';
import { Theme } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { saveThemeType } from '@app/utils/storage';

type UserType = {
	id: string;
	avatar: string;
	handle: string;
	mobileNumber: string;
};

type AppContextType = {
	user: UserType;
	updateUser: (user: UserType) => void;
	theme: ThemeColors;
	themeType: string;
	toggleTheme: (type: string) => void;
	unreadMessages: number;
	updateUnreadMessages: (count: number) => void;
	token: string;
	updateToken: (type: string) => void;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = (props) => {
	const [user, setUser] = useState({
		id: '',
		avatar: '',
		handle: '',
		mobileNumber: '',
	});
	const [theme, setTheme] = useState(Theme.light.colors);
	const [themeType, setThemeType] = useState(Theme.light.type);
	const [unreadMessages, setUnreadMessages] = useState(0);
	const [token, setToken] = useState('');

	const updateUser = (user: UserType) => {
		setUser(user);
	};

	const toggleTheme = (type: string) => {
		setTheme(Theme[type].colors);
		setThemeType(type);
		saveThemeType(type);
	};

	const updateUnreadMessages = (count: number) => {
		setUnreadMessages(count);
	};

	const updateToken = (token: string) => {
		setToken(token);
	};

	const value = {
		user,
		updateUser,
		theme,
		themeType,
		toggleTheme,
		unreadMessages,
		updateUnreadMessages,
		token,
		updateToken,
	};

	return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
