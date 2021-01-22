import actions from "./action";

const initialState = {
  readLoading: false,
  readVoucher: false,
  readError: false,
  submitLoading: false,
  submitError: false,
  tags: {},
  categories: {},

  vouchers: [],
  voucher: {
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

const voucherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      console.log("read database");
      return { ...state, readLoading: true };

    case actions.READ_FROM_DATABASE_SUCCESS:
      console.log("read database success");
      return { ...state, readLoading: false, vouchers: payload.data };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    case actions.SUBMIT_TO_BACKEND:
      console.log("submit");
      return {
        ...state,
        submitLoading: true,
        readVoucher: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
      };
    case actions.SUBMIT_TO_BACKEND_SUCCESS:
      console.log("submitSuccess");
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
        voucher: payload.data ? payload.data : initialState.voucher,
      };
    // case actions.READ_VOUCHER:
    //   return { ...state, readVoucher: true };

    // case actions.READ_VOUCHER_SUCCESS:
    //   console.log("read database success");
    //   return { ...state, readVoucher: false, vouchers: payload.data };

    // case actions.READ_VOUCHER_ERROR:
    //   return { ...state, readVoucher: true, readError: payload.error };

    default:
      return state;
  }
};

export default voucherReducer;
