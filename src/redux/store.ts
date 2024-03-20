import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
export default store;
