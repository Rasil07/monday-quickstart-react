import React from "react";
import { Heading, Box, Flex, TextField } from "monday-ui-react-core";
import "./styles.css";
import { useItemViewForm, useItemViewState } from "../../hooks";
import { Controller } from "react-hook-form";

const ItemView = () => {
  const { itemViewState } = useItemViewState();
  const { onSubmit, control, errors } = useItemViewForm(itemViewState);

  return (
    <Flex direction={Flex.directions.COLUMN} justify={Flex.justify.START}>
      <Heading value="Custom Item View" size={Heading.sizes.SMALL} />

      <Box
        className="box-wrapper"
        padding={Box.paddings.LARGE}
        rounded={Box.roundeds.MEDIUM}
        // borderColor={Box.borders.DEFAULT}
      >
        <form onSubmit={onSubmit} className="form-wrapper">
          <Flex
            direction={Flex.directions.COLUMN}
            gap={Flex.gaps.MEDIUM}
            justify={Flex.justify.SPACE_AROUND}
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Controller
              name="name"
              defaultValue={itemViewState.name}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  validation={{
                    status: !!errors.name ? "error" : undefined,
                    text: !!errors.name ? "Name is required" : "",
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
              defaultValue={itemViewState.description}
              render={({ field }) => (
                <div className="input-component">
                  <div
                    className="input-component__label--wrapper"
                    data-error={errors.description && "Description is required"}
                  >
                    <section className="label-component--wrapper">
                      <label className="label-component--text">
                        Description
                      </label>
                    </section>
                    <textarea
                      {...field}
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
              defaultValue={itemViewState.status}
              render={({ field }) => (
                <div className="input-component">
                  <div
                    className="input-component__label--wrapper"
                    data-error={errors.status && "Status is required"}
                  >
                    <section className="label-component--wrapper">
                      <label className="label-component--text">Status</label>
                    </section>
                    <select
                      id="item-status"
                      className="monday-select"
                      name="status"
                      placeholder=" Select Item Status"
                      {...field}
                    >
                      <option value="" disabled hidden>
                        Select status of item
                      </option>
                      <option value=""></option>
                      <option value="Working on it">Working on it</option>
                      <option value="Stuck">Stuck</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
              )}
            />
            <button className="submit-button">Submit</button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default ItemView;
