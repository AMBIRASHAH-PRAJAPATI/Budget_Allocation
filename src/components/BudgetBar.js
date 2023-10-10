import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Currency from "./Currency";

const BudgetBar = () => {
  const { Budget, spended, remaning, currency, dispatch } =
    useContext(AppContext);

  const changebudget = (val) => {
    dispatch({
      type: "CHG_BUDGET",
      payload: val,
    });
  };

  return (
    <div className="budget row">
      <div className="alert alert-secondary col">
        <span>
          Budget: {currency}
          <input
            required="required"
            type="number"
            id="cost"
            value={Budget}
            style={{ size: 10 }}
            onChange={(event) => changebudget(event.target.value)}
          ></input>
        </span>
      </div>
      <div className="alert alert-success col">
        <span>
          Remaining: {currency}
          {remaning}{" "}
        </span>
      </div>
      <div className="alert alert-primary col">
        <span>
          Spent so far: {currency}
          {spended}
        </span>
      </div>
      <Currency />
    </div>
  );
};

export default BudgetBar;
