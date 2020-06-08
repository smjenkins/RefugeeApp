import { Platform } from 'react-native';

const PROXIMITY_URLS = {
	HTTPS: 'https://proximity-development.herokuapp.com/',
	WSS: 'wss://proximity-development.herokuapp.com/',
};

const REFUGEE_APP_URLS = {
	HTTPS: 'https://refugeez-api.herokuapp.com/graphql',
};

const {
	author: { name, email, url },
	repository: { url: repository },
	version,
} = require('../../package.json');

const codepush = {
	staging: Platform.select({
		ios: '<private>',
		android: '<private>',
	}),
	production: Platform.select({
		ios: '<private>',
		android: '<private>',
	}),
};

const Config = {
	author: { name, email, url },
	repository,
	version,
	codepush,
	url: {
		https: REFUGEE_APP_URLS.HTTPS,
		wss: PROXIMITY_URLS.WSS,
	},
};

export default Config;
