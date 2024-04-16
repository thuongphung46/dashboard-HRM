import { put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { LoginPayload, authActions } from "../slices/authSlice";
import { AuthService } from "services/auth_service";
import { StaffService } from "services/staff_service";
import { storageAction } from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { ApiRes } from "types/ApiResponse";
import { toastMessage } from "components/molecules/toast_message";

function* handleLogin(payload: LoginPayload) {
  try {
    const response: ApiRes = yield call(AuthService.LoginAdmin, payload);
    if (response.status === 200 && response.data.msg_code === 200) {
      let token = response.data.content.body.access_token;
      storageAction("set", KeyValue.TokenKey, token);
      const resProfile: ApiRes = yield call(StaffService.GetMyProfile);
      if (resProfile.msg_code === 200) {
        storageAction("set", KeyValue.Level, resProfile.content.level);
        storageAction("set", KeyValue.id, resProfile.content.id);
        yield put(
          authActions.loginSuccess({
            id: 1,
            name: payload.UserName,
          })
        );
        toastMessage(`Wellcome ${payload.UserName}`, "success");
      } else {
        yield put(authActions.loginFailed(response.message)); // Dispatch action
        toastMessage(response.message, "error");
      }
    } else {
      yield put(authActions.loginFailed(response.message)); // Dispatch action
      toastMessage(response.message, "error");
    }
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
    toastMessage(error.message, "error");
  }
}

function* handleLogout() {
  yield put(authActions.logout());
  yield storageAction("clear", KeyValue.TokenKey);
  // Redirect to Login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    } else {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
