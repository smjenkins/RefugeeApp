const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const { generateToken } = require('../../utils');
const { UserModel } = require('./model');

exports.loginUser = async function({ phone }) {
  try {
    const verification = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });

    return {
      success: true,
      message: 'A verification code has been sent to ' + verification.to,
    };
  } catch (e) {
    if (e.code === 60203) {
      throw new Error('MaxSendAttemptsReached');
    }

    console.error(e);
    throw new Error('LoginFailure');
  }
};

exports.verifyUser = async function({ phone, code }) {
  try {
    const verificationCheck = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (!verificationCheck.valid) throw new Error('InvalidVerificationCode');

    const existingUser = await UserModel.findOne({
      phone,
    });

    if (existingUser) {
      return {
        user: existingUser.toObject(),
        newUser: existingUser.email || existingUser.firstName || existingUser.lastName,
        token: await generateToken(existingUser.toObject()),
      };
    }

    const newUser = await new UserModel({
      phone,
    }).save();

    return {
      user: newUser.toObject(),
      newUser: existingUser.email || existingUser.firstName || existingUser.lastName,
      token: await generateToken(newUser.toObject()),
    };
  } catch (e) {
    switch (e.code) {
      case 60202:
        throw new Error('MaxCheckAttemptsReached');
      case 20404:
        throw new Error('VerificationNotExist');
      case 20429:
        throw new Error('TooManyRequests');
      default:
        throw e;
    }
  }
};

exports.editUserProfile = async function({ userUUID, ...edits }) {
  const existingUser = await UserModel.findById(userUUID);

  if (!existingUser) throw new Error('UserNotExist');

  return UserModel.findByIdAndUpdate(existingUser._id, edits, { new: true });
};

exports.getUserProfile = async function({ userUUID }) {
  return await UserModel.findById(userUUID);
};
