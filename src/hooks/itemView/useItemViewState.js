import React from "react";
import monday from "../../monday";

export const useItemViewState = () => {
  const [itemViewState, setItemViewState] = React.useState({
    name: "",
    status: "",
    description: "",
    itemId: "",
    boardId: "",
  });

  React.useEffect(() => {
    monday.listen("context", async (res) => {
      setItemViewState((prev) => ({
        ...prev,
        itemId: res.data.itemId,
        boardId: res.data.boardId,
      }));

      const itemId = res.data.itemId;
      await monday
        .api(
          `query { items (ids: ${itemId}) { name column_values { id text title value} } }`
        )
        .then(async (res) => {
          const item = res.data.items[0];
          const columnValues = item.column_values;
          const name = item.name;
          const status =
            columnValues.find(
              (columnValue) =>
                columnValue.title === "Status" || columnValue.title === "status"
            )?.text ?? "";

          //create a new column in the board and name it "Description" to get the description value if not exist.
          let description = "";
          const isDescriptionColumnExists = columnValues.find(
            (columnValue) =>
              columnValue.title === "Description" ||
              columnValue.title === "description"
          );
          //if the description column exists, get the value.
          if (isDescriptionColumnExists) {
            description = isDescriptionColumnExists.text;
          } else {
            //if the description column doesn't exist, create a new column.
            await monday.api(
              `mutation { create_column (board_id: ${itemViewState.boardId}, title: "Description", column_type: text) { id } }`
            );
          }

          setItemViewState((prev) => ({
            ...prev,
            name: name,
            status: status,
            description: description,
          }));
        });
    });
  }, [itemViewState.boardId]);

  return {
    itemViewState,
  };
};
