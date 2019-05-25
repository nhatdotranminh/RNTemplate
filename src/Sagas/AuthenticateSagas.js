import { put, call, select, } from 'redux-saga/effects';

import AuthenticateActions, { getUserRegisterInfo } from '../Redux/AuthenticateRedux';
import { Types } from '../Constants'
import { CommonUtils } from '../Utils';
// attempts to authenticate
export const selectUserRegisterInfo = (state) => {
    //CommonUtils.log('AuthenticateSagas userRegister state: ', state);
    return getUserRegisterInfo(state.authenticate)
};
export function* authenticate(api, param) {
    //CommonUtils.log('DeviceID ', CommonUtils.DEVICE_UID);
    try {
        const { user, isSignup, isLogin, isSendOTP, isReSendOTP } = param.authenticate;
        //CommonUtils.log('AuthenticateSagas authenticate param: ', param);
        let body = {}
        let userRegister = null
        if (isLogin) {
            CommonUtils.log('isLogin Actions: ');
            body = {
                password: user.passWord,
                phone: user.phone
            }
        } else if (isSignup) {
            // select user register infor in reducer authenticate
            let stateUserRegister = yield select(selectUserRegisterInfo);
            //
            CommonUtils.log('AuthenticateSagas state userRegister param: ', stateUserRegister);
            if (!isSendOTP) {
                CommonUtils.log('isSignUp Actions: ');
                // Sign Up param
                body = {
                    ...stateUserRegister,
                    otpCode: user.otpCode,
                    deviceId: CommonUtils.DEVICE_UID
                }
            } else {
                if (!isReSendOTP) {
                    // Send OTP to sign Up and save user resgiter information ro reducer
                    userRegister = {
                        password: user.passWord,
                        phone: user.phone,
                        name: user.name,
                    }
                    body = {
                        phone: user.phone,
                        type: Types.OTP_SIGNUP
                    }
                } else {
                    // 
                    body = {
                        phone: stateUserRegister.phone,
                        type: Types.OTP_SIGNUP
                    }
                }

            }
        }
        const response = isSignup ? isSendOTP ? yield call(api.sendOTP, body) : yield call(api.signup, body) : yield call(api.login, body);
        const authenticate = { isLogin: false, isSignup: false, isSendOTP: false, isReSendOTP: false, userRegister, ...response };
        const status = {
            isLogin,
            isSignup,
            isSendOTP,
            isReSendOTP
        }
        CommonUtils.log('AuthenticateSagas response: ', response);
        if (response.data.status === 'error') {
            const error = {
                error: response.data.message,
                ...status
            }
            //CommonUtils.log('Authenticate Error: ', error);

            // dispatch failure
            yield put(AuthenticateActions.authenticateFailure(error))
        } else {
            // dispatch successful authentication
            if (isSendOTP && isSignup) {
                //CommonUtils.log('isSignUp send otp ', userRegister);
                if (!isReSendOTP) {
                    yield put(AuthenticateActions.userRegisterInfo({ userRegister, status }))
                }
            } else {
                yield put(AuthenticateActions.authenticateSuccess(authenticate))
            }
        }

    } catch (error) {
        yield put(AuthenticateActions.authenticateFailure(error))
        CommonUtils.log('AuthenticateSagas error: ', error)
    }

}
