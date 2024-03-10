import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import rootSaga from "./rootSaga";
import logger from "redux-logger";
import AuthReducer from "./slices/auth_slice";
import { ControllBarReducer } from "./slices/controll_bar_slice";

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: {},
});

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    ControllBar: ControllBarReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(sagaMiddleware);
    if (process.env.NODE_ENV === "development") {
      middlewares.push(logger);
    }

    return middlewares;
  },
});

// sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
