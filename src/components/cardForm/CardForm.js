import React, { useState } from "react";
import classNames from "classnames";
import "./CardForm.scss";

const CardForm = ({ addUpdateCard, card, removeCard }) => {
  const [value, setValue] = useState("");
  const [editFlag, setEditFlag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUpdateCard(value, card, editFlag);
    setEditFlag(false);
    setValue("");
  };

  const editCardHandler = () => {
    setValue(card.text);
    setEditFlag(true);
  };

  return (
    <div style={{ background: card.color }} className={classNames("cards")}>
      <form onSubmit={handleSubmit}>
        {editFlag ? (
          <input
            className={classNames("textArea")}
            placeholder="Empty card"
            name="textarea"
            id="textarea"
            value={value}
            autoComplete="off"
            disabled={!editFlag}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        ) : (
          card.text
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
              "fa fa-chevron-down": card.field === "task",
            })}
            aria-hidden="true"
            onClick={handleSubmit}
          ></i>
        </span>
        <span>
          <i
            className={classNames("normal", "fa fa-eye")}
            aria-hidden="true"
          ></i>
        </span>
      </div>
    </div>
  );
};

export default CardForm;
