import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getOneForId = ({posts}, id) => posts.data.find(post => post.id === id);
export const getForEmail = ({posts, user}) => posts.data.filter(post => user&& user.type === 'regUser' && post.email === user.email);
export const getRequest = ({posts}) => posts.request;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const START_REQUEST = createActionName('START_REQUEST');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const SAVE_POST = createActionName('SAVE_POST');

/* action creators */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const postSaved = payload => ({ payload, type: SAVE_POST });

/* thunk creators */
export const loadPostsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/post`);
      dispatch(fetchSuccess(res.data));

    } catch (e) {
      dispatch(requestError({type: 'LOAD_POSTS', message: e.message}));
    }
  };
};

export const loadOneRequest = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/post/${id}`);
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(requestError({type: 'LOAD_ONE', message: e.message}));
    }
  };
};

export const savePostRequest = postData => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const res = await axios.post(`${API_URL}/post`, postData);
      dispatch(postSaved(res.data));
    } catch (e) {
      dispatch(requestError({type: 'SAVE_POST', message: e.message}));
    }
  };
};

export const updatePostRequest = (id, postData) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const res = await axios.put(`${API_URL}/post/${id}`, postData);
      dispatch(postSaved(res.data));
    } catch (e) {
      dispatch(requestError({type: 'UPDATE_POST', message: e.message}));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case START_REQUEST: {
      return {
        ...statePart,
        request: {
          active: true,
          error: false,
          success: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      const postsArray = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {
        ...statePart,
        request: {
          active: false,
          error: false,
          success: true,
        },
        data: postsArray,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...statePart,
        request: {
          active: false,
          error: action.payload,
          success: false,
        },
      };
    }
    case SAVE_POST: {
      return {
        ...statePart,
        request: {
          active: false,
          error: false,
          success: true,
        },
        data: [action.payload],
      };
    }

    default:
      return statePart;
  }
};
