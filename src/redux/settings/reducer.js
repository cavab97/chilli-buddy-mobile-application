import actions from "./action";

const initialState = {
  readLoading: false,
  readError: false,

  tags: [],
  categories: [],

  readInfoLoading: false,
  readInfoError: false,

  info: {
    id: null,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    headerImages: [],
    share : {
      title: null,
      message: null,
      fbPost: null,
    },

    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        tags: payload.data.tags,
        categories: payload.data.categories,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_INFO:
      return { ...state, readInfoLoading: true, readInfoError: false };

    case actions.READ_INFO_SUCCESS:
      return {
        ...state,
        readInfoLoading: false,
        info: payload.data.info,
      };

    case actions.READ_INFO_ERROR:
      return { ...state, readInfoLoading: false, readInfoError: payload.error };

    default:
      return state;
  }
};

export default reducer;
