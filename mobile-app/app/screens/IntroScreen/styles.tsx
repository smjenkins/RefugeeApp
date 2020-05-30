import { StyleSheet, Platform } from 'react-native';

import { ThemeColors } from '@app/types/theme';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Typography } from '@app/theme';

const { FontWeights, FontSizes } = Typography;

export const styles = (theme = {} as ThemeColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.base,
		},
		content: {
			marginTop: responsiveHeight(8),
			marginHorizontal: 20,
		},
		titleText: {
			...FontWeights.Bold,
			...FontSizes.Heading,
			color: theme.text01,
		},
		subtitleText: {
			...FontWeights.Light,
			...FontSizes.Label,
			marginTop: 10,
			color: theme.text02,
		},
		banner: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingTop: responsiveHeight(Platform.select({ ios: 4, android: 6 })),
			paddingBottom: 16,
		},
		loginButton: {
			height: 54,
			width: responsiveWidth(90),
			alignSelf: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 20,
			borderWidth: 2,
			borderColor: theme.accent,
			backgroundColor: theme.accent,
		},
		loginButtonText: {
			...FontWeights.Regular,
			...FontSizes.Label,
			color: theme.white,
		},
	});
