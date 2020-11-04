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

  userRouteTickets: [],
  routeTickets: [],
  routeTicket: {
    id: null,
    invited: { at: null, by: null },
    sharedFb: { at: null, by: null },
    routeIds: [],
    route: {
      title: null,
      type: null,
      subtitle: null,
      description: null,
      images: [null],
      rules: null,
      terms: null,
      published: { at: null, by: null },
      terminated: { at: null, by: null },
      pending: { at: null, by: null },
      ongoing: { at: null, by: null },
      ended: { at: null, by: null },
      startTime: new Date(),
      endTime: new Date(),
      currentUser: 0,
      minimumUser: 0,
      totalMissions: 0,
      id: null,
      routeGroupId: [null],
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
    },
    userIds: [],
    user: {
      role: {
        absoluteDeveloper: false,
        developer: false,
        director: false,
        executive: false,
        admin: false,
        user: true,
      },
      accessLevel: 50,
      plan: null,
      disabled: false,
      displayName: null,
      name: { firstName: null, lastName: null },
      address: {
        line1: null,
        line2: null,
        postcode: null,
        state: null,
        country: null,
      },
      dateOfBirth: null,
      gender: null,
      username: null,
      email: null,
      emailVerified: false,
      identityNumber: null,
      phoneNumber: null,
      notificationToken: [],
      photoURL: null,
      providerId: null,
      lastLoginAt: null,
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
      id: null,
    },
    rewardIds : [],
    reward: {},
    numberApprovedMission:0,
    numberCompletedMissions: 0,
    completedMissions: [{ id: null, at: null }],
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
        userRouteTickets: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };


    case actions.READ_BY_USER:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_BY_USER_SUCCESS:
      return {
        ...state,
        readLoading: false,
        userRouteTickets: payload.data,
      };

    case actions.READ_BY_USER_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_BY_OBJECTGROUP:
      return { 
        ...state, 
        readLoading: true, 
        readError: false 
      };

    case actions.READ_BY_OBJECTGROUP_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routeTickets: payload.data,
      };

    case actions.READ_BY_OBJECTGROUP_ERROR:
      return { 
        ...state, 
        readLoading: false, 
        readError: payload.error
      };

    case actions.READ_RECORD:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routeTicket: payload.data,
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
        routeTicket: payload.data?payload.data:initialState.routeTicket,
      };

    default:
      return state;
  }
};

export default reducer;
