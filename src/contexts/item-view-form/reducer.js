import ACTIONS from "./action";

export const initialState = {
  name: "Test Title",
  status: "Stuck",
  description: "Desc",
  itemId: "",
  boardId: "",
};

export const itemViewReducer = (state = initialState, action) => {
  const { data, type } = action;

  switch (type) {
    case ACTIONS.SET_BOARD:
      return {
        ...state,
        boardId: data,
      };

    case ACTIONS.SET_ITEM_ID:
      return {
        ...state,
        itemId: data,
      };
    case ACTIONS.SET_FORM_DATA:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
