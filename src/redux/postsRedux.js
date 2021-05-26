import axios from 'axios';
import { API_URL } from '../config.js';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getAllPublished = ({ posts }) => posts.data.filter(post => post.status === 'published');
export const getOneForId = ({posts}, id) => posts.data.find(post => post.id === id);
export const getForEmail = ({posts, user}) => posts.data.filter(post => user && post.email === user.email);
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
export const fetchPublished = () => {
  return async dispatch => {
    dispatch(startRequest('LOAD_POSTS'));
    try {
      let res = await axios.get(`${API_URL}/api/posts`);
      dispatch(fetchSuccess(res.data));

    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const loadOneRequest = id => {
  return async dispatch => {
    dispatch(startRequest('LOAD_POST'));
    try {
      let res = await axios.get(`${API_URL}/api/posts/${id}`);
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const savePostRequest = postData => {
  return async dispatch => {
    dispatch(startRequest('SAVE_POST'));
    try {
      const res = await axios.post(`${API_URL}/api/posts`, postData);
      dispatch(postSaved(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
    }
  };
};

export const updatePostRequest = (id, postData) => {
  return async dispatch => {
    dispatch(startRequest('UPDATE_POST'));
    try {
      const res = await axios.put(`${API_URL}/api/posts/${id}`, postData);
      dispatch(postSaved(res.data));
    } catch (e) {
      dispatch(requestError(e.message || true));
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
          type: action.payload,
          active: true,
          error: false,
          success: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      const postsArray = Array.isArray(action.payload) ? action.payload : [action.payload];
      const postData = postsArray.map(({_id, ...other}) => ({id: _id, ...other}));
      return {
        ...statePart,
        request: {
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
        data: postData,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...statePart,
        request: {
          ...statePart.request,
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
          ...statePart.request,
          active: false,
          error: false,
          success: true,
        },
      };
    }

    default:
      return statePart;
  }
};
