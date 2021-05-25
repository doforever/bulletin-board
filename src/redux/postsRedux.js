import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getOneForId = ({posts}, id) => posts.data.find(post => post.id === id);
export const getForEmail = ({posts, user}) => posts.data.filter(post => user&& user.type === 'regUser' && post.email === user.email);
export const getRequest = ({posts}) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const loadPostsRequest = () => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/post`);
      dispatch(fetchSuccess(res.data));

    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

export const loadOneRequest = id => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/post/${id}`);
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      const postsArray = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: postsArray,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    default:
      return statePart;
  }
};
