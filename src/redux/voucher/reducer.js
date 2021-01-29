import actions from "./action";

const initialState = {
  readLoading: false,
  readError: false,
  submitLoading: false,
  submitError: false,
  submitResult: {
    objectName: null,
    ids: null,
    status: null,
    action: null,
    message: null,
  },
  success: false,

  vouchers: [],
  voucher: {
    id: null,
    active: false,
    assigned: false,
    claimed: false,
    onHold: false,
    amount: 0,
    quantity: 1,
    title: null,
    description: null,
    tnc: null,
    usedDate: { at: null, by: null },
    type: null,
    checkInIds: [null],
    merchantIds: [null],
    merchant: {
      id: null,
      businessName: null,
      businessRegistrationNumber: null,
      email: null,
      phoneNumber: null,
      address: {
        line1: null,
        line2: null,
        postcode: null,
        state: null,
        country: null,
      },
      shops: [null],
      superadmin: [null],
      admins: [null],
      categories: [null],
      dateJoined: new Date(),
      created: { at: null, by: null },
      deleted: { at: null, by: null },
    },
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
    prevUserIds: [{ id: null, prevAssignedDate: null }],
    assignedDate: { at: null, by: null },
    expiryDate: null,
    startDate: new Date(),
    endDate: new Date(),
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
  },
};

const voucherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      return {
        ...state,
        readLoading: true,
        readError: initialState.readError,
      };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        vouchers: payload.data,
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
        voucher: payload.data,
      };

    case actions.READ_RECORD_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };

    case actions.SUBMIT_TO_BACKEND:
      return {
        ...state,
        submitLoading: true,
        readVoucher: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
      };
    case actions.SUBMIT_TO_BACKEND_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        submitError: initialState.submitError,
        submitResult: payload.data,
        success: true,
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initialState.submitResult,
        success: false,
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
