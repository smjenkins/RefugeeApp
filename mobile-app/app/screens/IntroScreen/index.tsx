import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import SplashScreen from 'react-native-splash-screen';

import { AppContext } from '@app/context';
import { Routes } from '@app/constants';
import { ThemeStatic } from '@app/theme';
import { Button } from '@app/layout';
import IntroBanner from '@app/assets/svg/intro-banner.svg';
import { styles } from './styles';

const { EnterPhoneNumberScreen } = Routes;

const SPLASH_SCREEN_TIMEOUT = 2000;

const initialize = () => {
	SplashScreen.show();

	setTimeout(() => {
		SplashScreen.hide();
	}, SPLASH_SCREEN_TIMEOUT);
};

const IntroScreen: React.FC = () => {
	const { theme } = useContext(AppContext);
	const { navigate } = useNavigation();
	const { container, content, titleText, subtitleText, banner, loginButton, loginButtonText } = styles(theme);

	useEffect(() => {
		initialize();
	}, []);

	return (
		<View style={container}>
			<View style={content}>
				<Text style={titleText}>Refugee Support</Text>
				<Text style={subtitleText}>Welcome!</Text>
				<Text style={subtitleText}>
					Roo chewie uluru coldie off chops dead horse ugg boots relo frog in a sock arvo oldies.{' '}
				</Text>
			</View>
			<View style={banner}>
				<IntroBanner height={250} />
			</View>
			<View style={content}>
				<Button
					label="Get started"
					onPress={() => navigate('EnterPhoneNumberScreen')}
					containerStyle={loginButton}
					labelStyle={loginButtonText}
					indicatorColor={ThemeStatic.accent}
					loading={false}
				/>
			</View>
		</View>
	);
};

export default IntroScreen;
