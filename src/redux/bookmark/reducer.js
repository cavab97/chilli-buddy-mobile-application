import actions from "./action";

const initialState = {
  permissionVerificationLoading: false,
  permissionVerificationError: false,
  permissions: {},

  readLoading: false,
  readBookmark: false,
  readError: false,
  submitLoading: false,
  submitError: false,
  tags: {},
  categories: {},

  bookmarks: [],
  bookmark: {
    id: null,
    isBookmark: false,
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
    shopIds: [],
    promo: [],
    promotion: {
      id: null,
      title: null,
      coverPhotos: [],
      images: [],
      startTime: null,
      endTime: null,
      started: { at: null, by: null, boolean: false },
      ended: { at: null, by: null, boolean: false },
      shop: [
        {
          address: [
            {
              line1: null,
              line2: null,
              postcode: null,
              state: null,
              country: null,
            },
          ],
        },
        { categories: [] },
        { created: [{ at: null, by: null, dateJoined: null }] },
        { displayTitle: null },
        { images: [{ isPromote: null, l: null }] },
      ],
    },
    tags: [],
    categories: [],
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
    l: { _lat: 0, _long: 0 },
    g: null,
  },
};

const bookmarkReducer = (state = initialState, { type, payload }) => {
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
      console.log("read database");
      return { ...state, readLoading: true };

    case actions.READ_FROM_DATABASE_SUCCESS:
      console.log("read database success");
      return { ...state, readLoading: false, bookmarks: payload.data };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: true, readError: payload.error };

    case actions.TOGGLE_BOOKMARK:
      return { ...state, bookmarks: payload.data };

    case actions.READ_BOOKMARK:
      return { ...state, readBookmark: true };

    case actions.READ_BOOKMARK_SUCCESS:
      console.log("read database success");
      return { ...state, readBookmark: false, bookmarks: payload.data };

    case actions.READ_BOOKMARK_ERROR:
      return { ...state, readBookmark: true, readError: payload.error };

    case actions.READ_RECORD:
      return { ...state, readBookmark: true, readError: false };

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
        readBookmark: true,
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
        bookmark: payload.data ? payload.data : initialState.bookmark,
      };

    default:
      return state;
  }
};

export default bookmarkReducer;
