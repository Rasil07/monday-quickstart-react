import React from "react";
import { Dropdown, Flex, TextField, Button } from "monday-ui-react-core";
import "./styles.css";
import { useItemViewForm } from "../../hooks";
import { Controller } from "react-hook-form";
import { ItemViewContext } from "../../contexts/item-view-form/context";

const NewItemView = () => {
  const itemViewState = React.useContext(ItemViewContext);
  const { onSubmit, control, errors, isLoading } =
    useItemViewForm(itemViewState);

  const statusOptions = React.useMemo(
    () => [
      {
        value: "Working on it",
        label: "Working on it",
      },
      {
        value: "Stuck",
        label: "Stuck",
      },
      {
        value: "Done",
        label: "Done",
      },
    ],
    []
  );

  return (
    <div className="item-view-wrapper">
      <div className="form-header">
        <h2>Item Details</h2>
      </div>
      <form className="form-wrapper" onSubmit={onSubmit}>
        <Flex
          direction={Flex.directions.COLUMN}
          gap={Flex.gaps.LARGE}
          justify={Flex.justify.SPACE_AROUND}
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                disabled={isLoading}
                wrapperClassName="monday-storybook-text-field_size"
                validation={{
                  status: !!errors.name ? "error" : undefined,
                  text: !!errors.name ? "Item name is required" : "",
                }}
                {...field}
                type={TextField.types.TEXT}
                placeholder="Enter name of Item"
                title="Name"
                size={TextField.sizes.MEDIUM}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="input-component">
                <div
                  className="input-component__label--wrapper"
                  data-error={errors.description && "Description is required"}
                >
                  <section className="label-component--wrapper">
                    <label className="label-component--text">Description</label>
                  </section>
                  <textarea
                    {...field}
                    disabled={isLoading}
                    rows={4}
                    className="monday-textarea"
                    placeholder={"Describe your item"}
                  />
                </div>
              </div>
            )}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <div className="input-component">
                  <div
                    className="input-component__label--wrapper"
                    data-error={errors.status && "Status is required"}
                  >
                    <section className="label-component--wrapper">
                      <label className="label-component--text">Status</label>
                    </section>
                    <Dropdown
                      disabled={isLoading}
                      options={statusOptions}
                      value={statusOptions.find(
                        (item) => item.value === field.value
                      )}
                      placeholder="Select status"
                      onChange={(e) => field.onChange({ target: { ...e } })}
                    />
                  </div>
                </div>
              );
            }}
          />
        </Flex>
        <Button
          type={Button.types.SUBMIT}
          style={{ textAlign: "center" }}
          loading={isLoading}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default NewItemView;
