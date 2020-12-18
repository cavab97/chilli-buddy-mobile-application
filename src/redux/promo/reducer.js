import actions from "./action";

const initialState = {
  permissionVerificationLoading: false,
  permissionVerificationError: false,
  permissions: {},

  loading: false,
  tags: {},
  categories: {},

  readLoading: false,
  readError: false,
  promo: [],
  promotion: {
    id: null,
    bookmark: null,
    isBookmark: false,
    coverPhotos: null,
    endTime: null,
    description: null,
    logo: [],
    images: [],
    phoneNumber: null,
    email: null,
    shop: [
      { address: [{ country: null, line1: null, line2: null, postcode: null, state: null }] },
      { categories: [] },
      { created: [{ at: null, by: null, dateJoined: null }] },
      { displayTitle: null },
      { images: [{ isPromote: null, l: null }] },
    ],
    merchants: [],
    manager: [],
    supervisor: [],
    worker: [],
    tags: [],
    categories: [],
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
    l: { _lat: 0, _long: 0 },
    g: null,
  },
};

const promoReducer = (state = initialState, { type, payload }) => {
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
      return { ...state, readLoading: true };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return { ...state, readLoading: false, promo: payload.data };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.READ_RECORD:
      return { ...state, readLoading: true, readError: false };

    case actions.READ_RECORD_SUCCESS:
      return {
        ...state,
        readLoading: false,
        promotion: payload.data,
      };

    case actions.READ_RECORD_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.TOGGLE_PROMO_BOOKMARK:
      return { ...state, promo: payload.data };

    default:
      return state;
  }
};

export default promoReducer;
