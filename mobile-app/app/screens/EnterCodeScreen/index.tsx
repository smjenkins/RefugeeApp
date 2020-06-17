import React, { useContext, useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useMutation } from '@apollo/react-hooks';
import { SkypeIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

import { AppContext } from '@app/context';
import { styles } from './styles';
import { Button } from '@app/layout';
import { Routes } from '@app/constants';
import { MUTATION_VERIFY } from '@app/graphql/mutation';
import { ThemeStatic, Theme } from '@app/theme';
import EnterCodeBanner from '@app/assets/svg/enter-code-banner.svg';

const EnterCodeScreen: React.FC = () => {
	// prettier-ignore
	const { theme, user: { mobileNumber }, updateToken } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [verificationCode, setVerificationCode] = useState('');
	const [verifyUser] = useMutation(MUTATION_VERIFY);
	const { navigate } = useNavigation();

	const handleLogin = async () => {
		setLoading(true);

		try {
			const response = await verifyUser({ variables: { phone: mobileNumber, code: verificationCode } });
			updateToken(response.data.verifyUser.token);
			navigate(Routes.App);
		} catch (error) {
			Alert.alert(JSON.stringify(`Error: ${error.graphQLErrors[0].message}`, null, 4));
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView>
			{loading && (
				<View style={styles(theme).modalWrapper}>
					<Modal
						isVisible={loading}
						animationIn="fadeIn"
						animationOut="fadeOut"
						backdropOpacity={0.95}
						backdropColor="white"
						hideModalContentWhileAnimating={true}>
						<View>
							<SkypeIndicator color={Theme.light.colors.accent} style={{ marginBottom: 50 }} />
							<Text style={styles(theme).modalText}>Checking your verification code...</Text>
						</View>
					</Modal>
				</View>
			)}

			<View style={styles(theme).container}>
				<View style={styles(theme).content}>
					<Text style={styles(theme).titleText}>What's your verification code?</Text>
					<Text style={styles(theme).subtitleText}>We've sent a six-digit verification code to {mobileNumber}.</Text>
				</View>

				<View style={styles(theme).main}>
					<View style={styles(theme).banner}>
						<EnterCodeBanner height={200} />
					</View>

					<View style={styles(theme).content}>
						<Text style={styles(theme).inputLabel}>Enter verification code</Text>
						<View style={styles(theme).inputWrapper}>
							<TextInput
								style={styles(theme).phoneNumberInput}
								onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
								value={verificationCode}
								maxLength={6}
								keyboardType="number-pad"
								placeholder="Example: 123456"
							/>
						</View>
					</View>
				</View>

				<View style={styles(theme).action}>
					<Button
						label="Back"
						onPress={() => navigate('EnterPhoneNumberScreen')}
						containerStyle={{ ...styles(theme).loginButton, ...styles(theme).backButton }}
						labelStyle={styles(theme).backButtonText}
						indicatorColor={ThemeStatic.accent}
						loading={false}
					/>
					<Button
						label="Continue"
						onPress={handleLogin}
						containerStyle={styles(theme).loginButton}
						labelStyle={styles(theme).loginButtonText}
						indicatorColor={ThemeStatic.accent}
						loading={loading}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default EnterCodeScreen;
