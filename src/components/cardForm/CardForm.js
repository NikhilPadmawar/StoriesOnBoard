import React, { useState } from "react";
import classNames from "classnames";
import "./CardForm.scss";
import PropTypes from "prop-types";

const CardForm = ({ card, removeCard, updateCard, addCard }) => {
  const [value, setValue] = useState("");
  const [editFlag, setEditFlag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    editFlag ? updateCard(value, card) : addCard(card);
    setEditFlag(false);
    setValue("");
  };

  const editCardHandler = () => {
    setValue(card.title);
    setEditFlag(true);
  };
  return (
    <div
      className={classNames("cards", {
        goal: card && card.type === "goal",
        activity: card && card.type === "activity",
        task: card && card.type === "task",
      })}
    >
      <form onSubmit={handleSubmit}>
        {editFlag ? (
          <input
            className={classNames("textArea")}
            type="text"
            placeholder="Empty card"
            name="textarea"
            id="textarea"
            value={value}
            autoComplete="off"
            disabled={!editFlag}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        ) : (
          card && card.title
        )}
      </form>
      <div className={classNames("hoverable")}>
        <span className={classNames("hover")}>
          <label htmlFor="textarea">
            <i
              htmlFor="textarea"
              className={classNames("fa fa-pencil")}
              aria-hidden="true"
              onClick={editCardHandler}
            ></i>
          </label>
          <i
            className={classNames("fa fa-trash")}
            aria-hidden="true"
            onClick={() => removeCard(card)}
          ></i>
          <i
            className={classNames("fa fa-chevron-right", {
              "fa fa-chevron-down": card && card.type === "task",
            })}
            aria-hidden="true"
            onClick={handleSubmit}
          ></i>
        </span>
        <span
          className={classNames("normal", {
            iconSpacing: card && card.type === "task",
          })}
        >
          <i className={classNames("fa fa-eye")} aria-hidden="true"></i>
          {card && card.type === "task" ? (
            <i aria-hidden="true">{card.estimation !== 0 && card.estimation}</i>
          ) : (
            ""
          )}
          {card && card.type !== "task" ? (
            <i
              aria-hidden="true"
              className={classNames({ alignTotal: card.estimation })}
            >
              {card.estimation !== 0 && card.estimation}
            </i>
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
};

CardForm.propTypes = {
  id: PropTypes.string,
  parent: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  estimation: PropTypes.number,
  children: PropTypes.array,
};

export default CardForm;
