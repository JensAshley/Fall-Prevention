import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const mapStateToProps = (state: any) => {
  return {
    userId: state.userId,
    name: state.name,
    email: state.email,
    password: state.password,
    users: state.users
  }
}

const rootReducer = combineReducers({
  user: reducer
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export { mapStateToProps };