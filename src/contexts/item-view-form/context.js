import React, { useReducer } from "react";
import monday from "../../monday";
import ACTIONS from "./action";
import { itemViewReducer, initialState } from "./reducer";

export const ItemViewContext = React.createContext(initialState);

export const ItemViewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemViewReducer, initialState);

  React.useEffect(() => {
    monday.listen("context", async (res) => {
      const itemId = res.data.itemId;
      const boardId = res.data.boardId;

      dispatch({ type: ACTIONS.SET_BOARD, data: boardId });
      dispatch({ type: ACTIONS.SET_ITEM_ID, data: itemId });

      // Fetch Item Details
      const item_detail_query = `query { items (ids: ${itemId}) { name column_values { id text title value} } }`;

      await monday
        .api(item_detail_query)
        .then(async (res) => {
          const item = res.data.items[0];
          const columnValues = item.column_values;
          const name = item.name;
          const status =
            columnValues.find((columnValue) => columnValue.title === "Status")
              ?.text ?? "";

          // Check if description column already exists.
          let description = "";
          const isDescriptionColumnExists = columnValues.find(
            (columnValue) => columnValue.title === "Description"
          );

          if (isDescriptionColumnExists) {
            description = isDescriptionColumnExists.text;
          } else {
            // Creates Description Column if Description column doesnot exists
            const create_description_column_query = `mutation { create_column (board_id: ${boardId}, title: "Description", column_type: text) { id } }`;
            await monday.api(create_description_column_query);
          }

          dispatch({
            type: ACTIONS.SET_FORM_DATA,
            data: {
              name,
              status,
              description,
            },
          });
        })
        .catch((err) => console.log({ err }));
    });
  }, []);

  return (
    <ItemViewContext.Provider
      value={{
        boardId: state.boardId,
        itemId: state.itemId,
        name: state.name,
        description: state.description,
        status: state.status,
        dispatch,
      }}
    >
      {children}
    </ItemViewContext.Provider>
  );
};
