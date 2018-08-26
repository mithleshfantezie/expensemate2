
import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import thunk from 'redux-thunk';
import {userDetail} from './user-reducer';
import {expensesReducer} from './expenses-reducer';
import {reducer as formReducer } from 'redux-form';

export const init = () => {
  const reducer = combineReducers({
    user: userDetail,
    expenses: expensesReducer,
    form: formReducer
  });

  const composeEnhancers = compose;

  const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),composeEnhancers(applyMiddleware(thunk)));

  return store;

}
