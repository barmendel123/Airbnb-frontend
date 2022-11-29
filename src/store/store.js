import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { entityReducer } from './reducers/entity.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    entityModule: entityReducer,
    userModule: userReducer
})

// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


