import React, { useState } from "react";
import classNames from "classnames";
import "./Card.scss";

const Card = ({ card, index, removeCard, submitOnEdit }) => {
  const recursion = (card) => {
    return card.map((ele) => {
      return (
        <ul key={ele.key}>
          <li>{ele.text}</li>
          {ele.children && recursion(ele.children)}
        </ul>
      );
    });
  };

  return <div>{recursion(card)}</div>;

  // const [value, setValue] = useState("");
  // const [editFlag, setEditFlag] = useState(false);

  // const editHandler = (event) => {
  //   setValue(event.target.value);
  // };

  // const editCard = (index, text) => {
  //   console.log(index, text);
  //   setEditFlag(true);
  //   setValue(card.text);
  // };

  // return (
  //   <div>
  //     <div className={classNames("card")}>
  //       <form onSubmit={() => submitOnEdit(index, value)}>
  //         {editFlag ? (
  //           <input type="text" value={value} onChange={editHandler}></input>
  //         ) : (
  //           card.text
  //         )}
  //       </form>
  //       <div>
  //         <button onClick={() => removeCard(index)}>x</button>
  //         <button onClick={editCard}>Edit</button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Card;
