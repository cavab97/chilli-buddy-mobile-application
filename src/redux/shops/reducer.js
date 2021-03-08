import actions from "./action";

const initialState = {
  permissionVerificationLoading: false,
  permissionVerificationError: false,
  permissions: {},

  loading: false,
  tags: {},
  categories: {},

  selectedCategory: null,
  selectedTag: null,
  currentFavourite: false,
  favouriteControl: false,
  favouriteError: false,

  readLoading: false,
  readError: false,
  promo: [],
  shops: [],
  shop: {
    id: null,
    title: null,
    isFavourite: false,
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
    operatingHour: [
      { close: "1800", day: "mon", open: "0600", operate: false },
      { close: "1800", day: "tue", open: "0600", operate: false },
      { close: "1800", day: "wed", open: "0600", operate: false },
      { close: "1800", day: "thu", open: "0600", operate: false },
      { close: "1800", day: "fri", open: "0600", operate: false },
      { close: "1800", day: "sat", open: "0600", operate: false },
      { close: "1800", day: "sun", open: "0600", operate: false },
    ],
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
  promotion: {
    id: null,
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

const shopsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PERMISSION_VERIFICATION:
      return {
        ...state,
        permissionVerificationLoading: true,
        permissionVerificationError: false,
      };

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
        loading: true,
      };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        loading: false,
      };

    case actions.READ_PROMO_FROM_DATABASE:
      return {
        ...state,
        loading: true,
      };

    case actions.READ_PROMO_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        loading: false,
        promo: payload.data,
      };

    case actions.READ_PROMO_FROM_DATABASE_ERROR:
      return {
        ...state,
        loading: false,
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
        shop: payload.data,
      };

    case actions.READ_RECORD_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };

    case actions.TOGGLE_SHOP_FAVOURITE:
      return {
        ...state,
        shops: payload.data.shops,
        shop: payload.data.shop !== null ? payload.data.shop : state.shop,
      };

    case actions.TOGGLE_SHOP_SINGLEMERCHANT_FAVOURITE:
      return {
        ...state,
        favouriteControl: payload.data,
      };

    case actions.TOGGLE_SHOP_FAVOURITE_ERROR:
      return {
        ...state,
        favouriteError: payload.data,
      };

    case actions.TOGGLE_CATEGORY:
      return {
        ...state,
        selectedCategory: payload.data,
        selectedTag: null,
      };

    case actions.TOGGLE_FAVOURITE:
      return {
        ...state,
        favouriteControl: !state.favouriteControl,
      };

    case actions.TOGGLE_TAG:
      return {
        ...state,
        selectedTag: payload.data,
      };

    default:
      return state;
  }
};

export default shopsReducer;
