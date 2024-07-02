import { configureStore } from '@reduxjs/toolkit';

import heroReducer from '../reducers/heroReducer';
import filterReducer from '../reducers/filterReducer';


// const enhancer = (createStore) => (...arg) =>{
//     const store = createStore(...arg)

//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if(typeof action === 'string'){
//             return oldDispatch({type:action})
//         }
//             return oldDispatch(action)        
//     }

//     return store;
// }

const isString = (store) => (dispatch) => (action) => {
    if(typeof action === 'string'){
        return dispatch({type:action})
    }
    return dispatch(action)
}

// const store = createStore(
//     combineReducers({heroReducer,filterReducer}),
//     compose(applyMiddleware(isString,thunk))
// );


const store = configureStore({
    reducer:{heroReducer,filterReducer},
    middleware:getDefaultMiddleware => getDefaultMiddleware().concat(isString),
    devTools: process.env.NODE_ENV !== "production"
})

export default store;