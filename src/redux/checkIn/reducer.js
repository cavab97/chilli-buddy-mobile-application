import actions from "./action";

const initialState = {
  submitLoading: false,
  readLoading: false,
  readError: false,
  modalVisible: false,
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

  checkIns: [],
  checkIn: {
    id: null,
    numberCheckIn: 1,
    lastCheckedIn: null,
    status: false,
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
    voucherIds: [null],
    voucher: {
      id: null,
      active: false,
      assigned: false,
      claimed: false,
      amount: 0,
      quantity: 1,
      type: null,
      title: null,
      description: null,
      tnc: null,
      usedDate: { at: null, by: null },
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
      prevUserIds: [{ id: null, prevAssignedDate: null }],
      assignedDate: { at: null, by: null },
      expiryDate: null,
      startDate: new Date(),
      endDate: new Date(),
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
    },
    checkInRecord: [],
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
        readError: initialState.readError,
      };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: initialState.readLoading,
        checkIn: payload.data[0] ? payload.data[0] : initialState.checkIn,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: initialState.readLoading,
        readError: payload.error,
      };

    case actions.SUBMIT_TO_BACKEND:
      return {
        ...state,
        submitLoading: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
        // modalVisible: false,
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
        modalVisible: true,
      };

    case actions.SUBMIT_CANCEL:
      return {
        ...state,
        submitLoading: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
        // modalVisible: false,
      };

    case actions.SUBMIT_CANCEL_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        submitError: initialState.submitError,
        submitResult: payload.data,
      };

    case actions.SUBMIT_CANCEL_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initialState.submitResult,
        modalVisible: true,
      };

    case actions.SUBMIT_CLAIM:
      return {
        ...state,
        submitLoading: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
        // modalVisible: false,
      };

    case actions.SUBMIT_CLAIM_SUCCESS:
      return {
        ...state,
        submitLoading: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
        // modalVisible: false,
      };

    case actions.SUBMIT_CLAIM_ERROR:
      return {
        ...state,
        submitLoading: true,
        submitError: initialState.submitError,
        submitResult: initialState.submitResult,
        // modalVisible: false,
      };

    case actions.TOGGLE_MODAL:
      console.log("!state.modalVisible");

      console.log(!state.modalVisible);
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };

    default:
      return state;
  }
};
export default reducer;
