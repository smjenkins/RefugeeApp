import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useMutation } from '@apollo/react-hooks';
import { Picker } from '@react-native-community/picker';
import { SkypeIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

import { AppContext } from '@app/context';
import { styles } from './styles';
import { Button } from '@app/layout';
import { Routes } from '@app/constants';
import { MUTATION_LOGIN } from '@app/graphql/mutation';
import { ThemeStatic, Theme } from '@app/theme';
import EnterPhoneNumberBanner from '@app/assets/svg/enter-phone-number-banner.svg';
import { countries } from './constants';

const EnterPhoneNumberScreen: React.FC = () => {
	const { theme, user, updateUser } = useContext(AppContext);
	const [loading, setLoading]: [boolean, any] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState({ countryCode: '', mobileNumber: '' });
	const [login] = useMutation(MUTATION_LOGIN);
	const { navigate } = useNavigation();

	useEffect(() => {
		setPhoneNumber({ ...phoneNumber, countryCode: countries[0].dial_code });
	}, []);

	const handleLogin = async () => {
		setLoading(true);

		try {
			const mobileNumber = `${phoneNumber.countryCode}${phoneNumber.mobileNumber.replace(/^0+/, '')}`;

			await login({ variables: { phone: mobileNumber } });
			updateUser({ ...user, mobileNumber });
			navigate('EnterCodeScreen');
		} catch (error) {
			// to handled more gracefully in the next PR
			Alert.alert(JSON.stringify(error.message));
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView>
			{loading && (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Modal
						isVisible={true}
						animationIn="fadeIn"
						animationOut="fadeOut"
						backdropOpacity={0.95}
						backdropColor="white"
						hideModalContentWhileAnimating={true}>
						<View>
							<SkypeIndicator color={Theme.light.colors.accent} style={{ marginBottom: 50 }} />
							<Text
								style={{
									...styles(theme).subtitleText,
									color: Theme.light.colors.accent,
									textAlign: 'center',
									fontSize: 18,
								}}>
								Verifying your mobile number...
							</Text>
						</View>
					</Modal>
				</View>
			)}

			<View style={styles(theme).container}>
				<View style={styles(theme).content}>
					<Text style={styles(theme).titleText}>What's your mobile number?</Text>
					<Text style={styles(theme).subtitleText}>Please enter your mobile number so we can verify your account</Text>
				</View>

				<View style={styles(theme).main}>
					<View style={styles(theme).banner}>
						<EnterPhoneNumberBanner height={200} />
					</View>

					<View style={styles(theme).content}>
						<Text style={styles(theme).inputLabel}>Select your country</Text>
						<View style={styles(theme).inputWrapper}>
							<Picker
								selectedValue={phoneNumber.countryCode}
								style={styles(theme).picker}
								prompt="Select your country"
								onValueChange={(countryCode) => {
									setPhoneNumber({ ...phoneNumber, countryCode: String(countryCode) });
								}}>
								{countries.map((country) => (
									<Picker.Item
										label={`${country.flag}   ${country.name} (${country.dial_code})`}
										value={country.dial_code}
										key={country.code}
									/>
								))}
							</Picker>
						</View>

						<Text style={styles(theme).inputLabel}>Enter your mobile number</Text>
						<View style={styles(theme).inputWrapper}>
							<View style={styles(theme).inputPrefix}>
								<Text style={styles(theme).inputPrefixLabel}>{phoneNumber.countryCode}</Text>
							</View>
							<TextInput
								style={styles(theme).phoneNumberInput}
								onChangeText={(mobileNumber) => setPhoneNumber({ ...phoneNumber, mobileNumber: String(mobileNumber) })}
								value={phoneNumber.mobileNumber}
								maxLength={11}
								keyboardType="number-pad"
								placeholder="Example: (123) 456 789"
							/>
						</View>
					</View>
				</View>

				<View style={styles(theme).action}>
					<Button
						label="Back"
						onPress={() => navigate('IntroScreen')}
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
						disabled
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default EnterPhoneNumberScreen;
