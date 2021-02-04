import actions from "./action";

const initialState = {
  permissionVerificationLoading: false,
  permissionVerificationError: false,
  permissions: {},

  readLoading: false,
  readFavourite: false,
  readError: false,
  submitLoading: false,
  submitError: false,
  tags: {},
  categories: {},

  favourites: [],
  favourite: {
    id: null,
    isFavourite: false,
    userIds: [null],
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
    shopIds: [null],
    shop: {
      id: null,
      title: null,
      displayTitle: null,
      subtitle: null,
      description: null,
      logo: [null],
      images: [null],
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
      operatingHour: [{ day: null, open: null, close: null, operate: false }],
      merchants: [null],
      manager: [null],
      supervisor: [null],
      worker: [null],
      tags: [null],
      categories: [null],
      isPromote: false,
      dateJoined: new Date(),
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
      l: null,
      g: null,
    },
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
  },
};

const favouriteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PERMISSION_VERIFICATION:
      return { ...state, permissionVerificationLoading: true, permissionVerificationError: false };

    case actions.PERMISSION_VERIFICATION_SUCCESS:
      return {
        ...state,
        permissionVerificationLoading: false,
        permissions: payload.data.permissions,
      };

    case actions.PERMISSION_VERIFICATION_ERROR:
      return {
        ...state,
        permissionVerificationLoading: false,
        permissionVerificationError: payload.error,
      };

    case actions.READ_FROM_DATABASE:
      return { 
        ...state, 
        readLoading: true 
      };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return { 
        ...state, 
        readLoading: false, 
        favourites: payload.data 
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { 
        ...state, 
        readLoading: true, 
        readError: payload.error 
      };

    case actions.TOGGLE_FAVOURITE:
      return { 
        ...state, 
        favourites: payload.data 
      };

    case actions.READ_FAVOURITE:
      return { 
        ...state, 
        readBookmark: true 
      };

    case actions.READ_FAVOURITE_SUCCESS:
      return { 
        ...state, 
        readFavourite: false, 
        favourites: payload.data 
      };

    case actions.READ_FAVOURITE_ERROR:
      return { 
        ...state, 
        readFavourite: true, 
        readError: payload.error 
      };

    case actions.READ_RECORD:
      return { 
        ...state, 
        readFavourite: true, 
        readError: false 
      };

    // case actions.READ_RECORD_SUCCESS:
    //   return {
    //     ...state,
    //     readBookmark: false,
    //     bookmark: payload.data,
    //   };

    // case actions.READ_RECORD_ERROR:
    //   return { ...state, readBookmark: false, readError: payload.error };

    case actions.SUBMIT_TO_BACKEND:
      console.log("submit");
      return {
        ...state,
        submitLoading: true,
        readFavourite: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
      };
    case actions.SUBMIT_TO_BACKEND_SUCCESS:
      console.log("submitSuccess");
      return {
        ...state,
        submitLoading: false,
        // readBookmark: false,
        submitError: initialState.submitError,
        submitResult: payload.data,
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        //readBookmark: false,
        submitError: payload.error,
        submitResult: initialState.submitResult,
      };

    case actions.UPDATE:
      return {
        ...state,
        favourite: payload.data ? payload.data : initialState.favourite,
      };

    default:
      return state;
  }
};

export default favouriteReducer;
