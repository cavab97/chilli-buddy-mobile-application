import actions from "./action";

const initialState = {
  readLoading: false,
  readError: false,

  readOwnRewardsLoading: false,
  readOwnRewardsError: false,

  readEventRewardsLoading: false,
  readEventRewardsError: false,

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

  modalActive: false,

  rewards: [],
  ownRewards: [],
  eventRewards: [],
  reward: {
    id: null,
    rank: 0,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    routeIds: [],
    eventIds: [],
    issued: { at: null, by: null },
    obtained: { at: null, by: null, displayName: null, photoURL: null },
    claimed: { at: null, by: null },

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
        rewards: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_FROM_OWN_REWARDS:
      return {
        ...state,
        readOwnRewardsLoading: true,
        readOwnRewardsError: false,
      };

    case actions.READ_FROM_OWN_REWARDS_SUCCESS:
      return {
        ...state,
        readOwnRewardsLoading: false,
        ownRewards: payload.data,
      };

    case actions.READ_FROM_OWN_REWARDS_ERROR:
      return {
        ...state,
        readOwnRewardsLoading: false,
        readOwnRewardsError: payload.error,
      };

    case actions.READ_FROM_EVENT_REWARDS:
      return {
        ...state,
        readEventRewardsLoading: true,
        readEventRewardsError: false,
      };

    case actions.READ_FROM_EVENT_REWARDS_SUCCESS:
      return {
        ...state,
        readEventRewardsLoading: false,
        eventRewards: payload.data,
      };

    case actions.READ_FROM_EVENT_REWARDS_ERROR:
      return {
        ...state,
        readEventRewardsLoading: false,
        readEventRewardsError: payload.error,
      };

    case actions.READ_RECORD:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        reward: payload.data,
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

    case actions.MODAL_CONTROL:
      return {
        ...state,
        modalActive: !state.modalActive,
      };

    case actions.UPDATE:
      return {
        ...state,
        reward: payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
