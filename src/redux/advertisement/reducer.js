import actions from "./action";

const initialState = {
  readLoading: false,
  readError: false,

  advertisements: [],
  advertisement: {
    id: null,
    title:null,
    merchantDesc:null,
    description:null,
    termAndCon:null,
    coverPic:null,
    logo:null,
    subImage:[null,null,null],
    startDate:null,
    endDate:null,
    
    createAt:null,
    created:{
      by:null,
      time:null
    },
    deleted_at:null,
    key:null,
    likes:0,
    subImage2:null,
    updated:{by:null,time:null}
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
        advertisements: payload.data,
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return { ...state, readLoading: false, readError: payload.error };

    default:
      return state;
  }
};

export default reducer;
