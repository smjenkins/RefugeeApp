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
			justifyContent: 'space-between',
			height: '100%',
		},
		content: {
			marginTop: responsiveHeight(8),
			marginHorizontal: 20,
		},
		main: {
			justifyContent: 'center',
			alignItems: 'center',
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
			alignItems: 'center',
			paddingTop: responsiveHeight(Platform.select({ ios: 4, android: 6 })),
			maxHeight: 180,
			aspectRatio: 1,
		},
		terms: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		termsText: {
			...FontWeights.Light,
			...FontSizes.Body,
			color: theme.text02,
		},
		inputLabel: {
			...FontWeights.Light,
			...FontSizes.Label,
			marginTop: 10,
			marginBottom: 10,
			color: theme.text02,
		},
		phoneNumberInput: {
			// flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			height: 50,
			color: theme.text01,
			minWidth: '100%',
			...FontWeights.Regular,
			paddingLeft: 10,
		},
		inputWrapper: {
			justifyContent: 'space-between',
			maxWidth: '100%',
			flexBasis: '100%',
			flexGrow: 0,
			flexShrink: 1,
			alignItems: 'center',
			height: 50,
			borderColor: theme.accent,
			borderRadius: 50,
			borderWidth: 1,
			color: theme.text01,
			flexDirection: 'row',
			// marginBottom: 10,
			minWidth: '100%',
			padding: 10,
			marginBottom: 20,
		},
		inputPrefix: {
			flex: 1,
			minWidth: '17%',
			flexWrap: 'nowrap',
			flexShrink: 0,
			flexGrow: 1,
			paddingHorizontal: 3,
			paddingVertical: 3,
			alignItems: 'center',
			justifyContent: 'center',
			height: 50,
			borderLeftWidth: 0,
			borderTopWidth: 0,
			borderBottomWidth: 0,
			borderRightColor: theme.accent,
			borderRightWidth: 1,
		},
		inputPrefixLabel: {
			...FontWeights.Regular,
			color: theme.text02,
			margin: 1,
			display: 'flex',
			flexDirection: 'column',
		},
		picker: {
			height: 50,
			maxWidth: '100%',
			flexBasis: '100%',
			borderColor: theme.accent,
			borderRadius: 50,
			borderWidth: 1,
			padding: 10,
			...FontWeights.Regular,
			color: theme.text01,
		},
		pickerItem: {
			...FontWeights.Regular,
			color: theme.text01,
		},
		action: {
			marginTop: responsiveHeight(8),
			marginHorizontal: 20,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		loginButton: {
			height: 54,
			width: '49%',
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
		backButton: {
			borderColor: theme.text01,
			backgroundColor: 'transparent',
		},
		backButtonText: {
			...FontWeights.Regular,
			...FontSizes.Label,
			color: theme.text01,
		},
	});
