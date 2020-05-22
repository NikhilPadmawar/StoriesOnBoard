import React, { useEffect } from "react";
import classNames from "classnames";
import "./Header.scss";
import TransformCSVData from "../../utils/transFormDataToCSV";
import { CSVLink } from "react-csv";
import Avatar from "react-avatar";

const headers = [
  { label: "Goal", key: "Goal" },
  { label: "Activity", key: "Activity" },
  { label: "Task", key: "Task" },
  { label: "Estimation", key: "Estimation" },
];

const Header = ({ cardsData }) => {
  const transFormDataToCsv = TransformCSVData(cardsData);

  console.log(transFormDataToCsv);

  useEffect(() => {
    csvToJson(transFormDataToCsv);
  }, [transFormDataToCsv]);

  const csvToJson = (transFormDataToCsv) => {
    const csvData = [...transFormDataToCsv];
    csvData.reduce((acc, obj, index) => {
      let key = obj["Goal"];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);

      console.log(acc);
      return acc;
    }, []);
    console.log(csvData);
  };

  return (
    <div>
      <header className={classNames("header")}>
        <div className={classNames("logo")}>TW Story Board</div>
        <div className={classNames("profile")}>
          <CSVLink
            className={classNames("csv")}
            data={transFormDataToCsv}
            headers={headers}
          >
            Export
          </CSVLink>
          <Avatar name="Thought Works" size="40" round={true} color="#2464a8" />
        </div>
      </header>
    </div>
  );
};

export default Header;
