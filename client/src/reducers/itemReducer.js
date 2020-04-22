// import { v4 as uuidv4 } from 'uuid';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_LOADING,
} from '../actions/types';
import Axios from 'axios';

const initialState = {
  // items: [
  //   { id: uuidv4(), name: 'Eggs' },
  //   { id: uuidv4(), name: 'Milk' },
  //   { id: uuidv4(), name: 'Steak' },
  //   { id: uuidv4(), name: 'Orange' },
  // ],
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

// Axios.delete(`api/items/${id}`).then(res => {
//   dispatch({
//     type: DELETE_ITEM,
//     payload: id
//   })
// })
