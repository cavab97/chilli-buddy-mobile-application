import actions from "./action";

const initialState = {
  readLoading: false,
  readError: false,

  readClosedRoutesLoading: false,
  readClosedRoutesError: false,

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
  allRoutes: [],
  routes: [],
  closedRoutes: [],
  route: {
    id: null,
    type: null,
    category: null,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    rules: null,
    terms: null,
    published: { at: null, by: null },
    terminated: { at: null, by: null },
    pending: { at: null, by: null },
    ongoing: { at: null, by: null },
    ended: { at: null, by: null },
    startTime: null,
    endTime: null,
    currentUser: 0,
    minimumUser: 0,
    totalMissions: 0,
    assignCompleted: false,
    routeGroupId: [],
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
    station: 0
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case actions.READ_ALL_FROM_DATABASE:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_ALL_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        allRoutes: payload.data,
      };

    case actions.READ_ALL_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_FROM_DATABASE:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routes: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_CLOSED_ROUTES:
      return { ...state, readClosedRoutesLoading: true, readClosedRoutesError: false };

    case actions.READ_CLOSED_ROUTES_SUCCESS:
      return {
        ...state,
        readClosedRoutesLoading: false,
        closedRoutes: payload.data,
      };

    case actions.READ_CLOSED_ROUTES_ERROR:
      return { ...state, readClosedRoutesLoading: false, readClosedRoutesError: payload.error };

    case actions.READ_RECORD:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        route: payload.data,
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
        route: payload.data?payload.data:initialState.route,
      };

    default:
      return state;
  }
};

export default reducer;
