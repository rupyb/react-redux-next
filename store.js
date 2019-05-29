import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import data from './data/data.json';

const initialState = {
   cards: []
}


// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'INITIAL_CARDS':
          return { cards: action.cards };
      case 'ADD_CARD':
          return {
              ...state,
              cards: [...state.cards, action.item]
          };
      default:
          return state;
  }
}

// ACTIONS
export const initialCards = () => {
  return {
      type: 'INITIAL_CARDS',
      cards: data
  };
}

export const addItem = (item) => {
  return {
      type: 'ADD_CARD',
      item
  };
}


//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const initStore = (initialState = initialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
