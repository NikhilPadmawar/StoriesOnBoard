import React from "react";
import classNames from "classnames";
import "./Header.scss";
import TransformCSVData from "../../utils/transFormDataToCSV";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Goal", key: "Goal" },
  { label: "Activity", key: "Activity" },
  { label: "Task", key: "Task" },
  { label: "Estimation", key: "Estimation" },
];

const Header = ({ cardsData }) => {
  const transFormDataToCsv = TransformCSVData(cardsData);

  console.log(transFormDataToCsv);

  return (
    <div>
      <header className={classNames("header")}>
        <div className={classNames("logo")}>TW Story Board</div>
        <div className={classNames("profile")}>
          <CSVLink className={classNames("csv")} data={transFormDataToCsv} headers={headers}>
            Export
          </CSVLink>
          <div>Profile</div>
        </div>
      </header>
    </div>
  );
};

export default Header;
