import React from "react";
import { useForm } from "react-hook-form";
import monday from "../../monday";
import { usePrevious } from "monday-ui-react-core";
import ACTIONS from "../../contexts/item-view-form/action";

export const useItemViewForm = (itemViewState) => {
  const [isLoading, setLoading] = React.useState(false);

  const prevItemFormState = usePrevious({
    name: itemViewState.name,
    description: itemViewState.description,
    status: itemViewState.status,
  });

  const {
    register,
    unregister,
    control,
    formState: { errors, dirtyFields },
    watch,
    setValue,
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (isLoading) return;
    setLoading(true);
    const get_board_columns = `query { boards(ids: ${itemViewState.boardId}) { columns { id title } } }`;
    itemViewState.dispatch({
      type: ACTIONS.SET_FORM_DATA,
      data: formData,
    });
    monday
      .api(get_board_columns)
      .then((res) => {
        const columns = res.data.boards[0].columns;
        const status_column_id = columns.find(
          (column) => column.title === "Status"
        ).id;
        const description_column_id = columns.find(
          (column) => column.title === "Description"
        ).id;
        const name_column_id = columns.find(
          (column) => column.title === "Name"
        ).id;

        const change_multiple_column_values = `mutation {
  change_multiple_column_values (item_id: ${itemViewState.itemId}, board_id: ${itemViewState.boardId}, column_values: "{\\"${name_column_id}\\": \\"${formData.name}\\", \\"${status_column_id}\\": \\"${formData.status}\\", \\"${description_column_id}\\": \\"${formData.description}\\"}") {
    id
  }
}`;
        monday.api(change_multiple_column_values).then((res) => {
          if (!!res.error_message) {
            throw Error(res.error_message);
          }
          monday.execute("notice", {
            message: "Item updated successfully",
            type: "success",
            timeout: 5000,
          });
        });
      })
      .catch((err) => {
        itemViewState.dispatch({
          type: ACTIONS.SET_FORM_DATA,
          data: prevItemFormState,
        });
        console.log({ err });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  React.useEffect(() => {
    setValue("name", itemViewState?.name || "");
    setValue("description", itemViewState?.description || "");
    setValue("status", itemViewState?.status || "");
  }, [
    itemViewState.name,
    itemViewState.description,
    itemViewState.status,
    setValue,
  ]);
  return {
    errors,
    dirtyFields,
    register,
    unregister,
    control,
    watch,
    setValue,
    handleSubmit,
    onSubmit,
    getValues,
    isLoading,
  };
};
