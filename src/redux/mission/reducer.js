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

  modalActive: false,

  missions: [],
  mission: {
    id: null,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    shopIds: [],
    routeIds: [],
    minSpend: 0,
    shop: {
      id: null,
      title: null,
      displayTitle: null,
      subtitle: null,
      description: null,
      logo: [],
      images: [],
      facebookUrl: null,
      instagramUrl: null,
      websiteUrl: null,
      whatsapp: null,
      phoneNumber: null,
      email: null,
      address: {
        line1: null,
        line2: null,
        postcode: null,
        state: null,
        country: null,
      },
      operatingHour: [
        { day: null, open: null, close: null, operate: false },
        { day: null, open: null, close: null, operate: false },
        { day: null, open: null, close: null, operate: false },
        { day: null, open: null, close: null, operate: false },
        { day: null, open: null, close: null, operate: false },
        { day: null, open: null, close: null, operate: false },
        { day: null, open: null, close: null, operate: false },
      ],
      merchants: [],
      manager: [],
      supervisor: [],
      worker: [],
      tags: [],
      categories: [],
      dateJoined: null,
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
      l: { _lat: 0, _long: 0 },
      g: null,
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
        missions: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_RECORD:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        mission: payload.data,
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
        mission: payload.data? payload.data : initialState.mission,
      };

    case actions.UPDATE:
      return {
        ...state,
        mission: payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
