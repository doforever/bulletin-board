export const initialState = {
  posts: {
    data: [],
    current: null,
    lastFetch: null,
    request: {
      active: false,
      error: false,
      success: false,
    },
  },
  user: null,
};
