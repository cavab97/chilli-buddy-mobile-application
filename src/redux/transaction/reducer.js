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

  uploadLoading: false,
  uploadResult: {
    url: null
  },
  uploadError: false,
  uploadProgress: 0,

  transactions: [],
  transaction: {
    id: null,
    shopIds: [],
    userIds: [],
    routeTicketIds: [],
    routeIds: [],
    missionIds: [],
    payment: {
      paymentType: null,
      paymentId: null,
      receiptId: null,
      amount: 0,
      receiptPhotoUrl: null,
      receiptUrl: null,
    },
    routeTicket: {},
    mission: {},
    shop: {},
    user: {},
    route: {},
    paymentType: null,
    paymentId: null,
    approved: { at: null, by: null },
    rejected: { at: null, by: null },

    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.READ_BY_ROUTETICKET:
      return {
        ...state,
        readLoading: true,
        readError: false,
        transactions: [],
      };
    case actions.READ_BY_ROUTETICKET_SUCCESS:
      return {
        ...state,
        readLoading: false,
        transactions: payload.data,
      };

    case actions.READ_BY_ROUTETICKET_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error
      };


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

    case actions.UPDATE:
      return {
        ...state,
        transaction: payload.data,
      };

    case actions.UPLOAD_TO_STORAGE:
      return {
          ...state,
          uploadLoading: true,
          uploadProgress: initialState.uploadProgress,
          uploadResult: initialState.uploadResult,
          uploadError: initialState.uploadError
      };

    case actions.UPLOAD_TO_STORAGE_SUCCESS:
      return {
          ...state,
          uploadLoading: false,
          uploadProgress: initialState.uploadProgress,
          uploadResult: payload.data,
          uploadError: initialState.uploadError
      };

    case actions.UPLOAD_TO_STORAGE_ERROR:
      return {
          ...state,
          uploadLoading: false,
          uploadProgress: initialState.uploadProgress,
          uploadResult: initialState.uploadResult,
          uploadError: true,
      };

    case actions.UPDATE_UPLOAD_PROGRESS:
      return {
          ...state,
          uploadProgress: payload.data
      };

    default:
      return state;
  }
};

export default reducer;
