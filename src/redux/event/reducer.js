import actions from "./action";

const initialState = {

  readLoading: false,
  readError: false,

  events: [],
  event: {
    id: null,
    type: null,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    rules: null,
    terms: null,
    winner : { at: null, by: null, displayName: null, prizeTitle: null },
    published: { at: null, by: null },
    terminated: { at: null, by: null },
    startTime: null,
    endTime: null,
    assignedRewards : 0,
    totalRewards : 0,
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
        events: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.UPDATE:
      return {
        ...state,
        route: payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
