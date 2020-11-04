import actions from "./action";

const initialState = {
  readLoading: false,
  readError: false,

  submitLoading: false,
  submitError: {
    code: null,
    message: null,
    details: null,
  },
  submitResult: {
    objectName: null,
    ids: null,
    status: null,
    action: null,
    message: null,
  },

  routeGroups: [],
  routeGroup: {
    id: null,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    totalRoutes: 0,
    pendingRoutes: 0,
    ongoingRoutes: 0,
    endRoutes: 0,
    address: {
      line1: null,
      line2: null,
      postcode: null,
      state: null,
      country: null,
    },
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
    l: { _lat: 0, _long: 0 },
    g: null,
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
        routeGroups: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_RECORD:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routeGroup: payload.data,
      };

    case actions.READ_RECORD_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.SUBMIT_TO_BACKEND:
      return {
        ...state,
        submitLoading: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
      };
    case actions.SUBMIT_TO_BACKEND_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        submitError: initialState.submitError,
        submitResult: payload.data,
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initialState.submitResult,
      };

    case actions.UPDATE:
      return {
        ...state,
        routeGroup: payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
