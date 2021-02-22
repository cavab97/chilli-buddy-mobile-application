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

  posts: [],
  post: {
    id: null,
    title: null,
    description: null,
    coverPhoto: [],
    images: [],
    shopIds: [],
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
      whatsapp: null,
      websiteUrl: null,
      phoneNumber: null,
      email: null,
      address: {
        line1: null,
        line2: null,
        postcode: null,
        state: null,
        country: null,
      },

      merchants: [],
      manager: [],
      supervisor: [],
      worker: [],
      tags: [],
      categories: [],
      isPromote: false,
      dateJoined: null,
      totalMissions: 0,
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
      return {
        ...state,
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      // console.log(payload.data);
      return {
        ...state,
        readLoading: false,
        posts: payload.data,
      };
    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };
    case actions.READ_RECORD:
      return {
        ...state,
        readLoading: true,
        readError: false,
      };
    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        post: payload.data,
      };
    case actions.READ_RECORD_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };
    case actions.UPDATE:
      return {
        ...state,
        post: payload.data,
      };

    // case actions.READ_FROM_DATABASE_SINGLEPOST:
    //   return {
    //     ...state,
    //     readLoading: true,
    //     readError: false,
    //   };
    // case actions.READ_FROM_DATABASE_SINGLEPOST_SUCCESS:
    //   return {
    //     ...state,
    //     readLoading: false,
    //     post: payload.data,
    //   };
    // case actions.READ_FROM_DATABASE_SINGLEPOST_ERROR:
    //   return {
    //     ...state,
    //     readLoading: false,
    //     readError: payload.error,
    //   };

    default:
      return state;
  }
};

export default reducer;
