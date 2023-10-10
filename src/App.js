import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import BudgetBar from "./components/BudgetBar";
import ExpenseList from "./components/ExpenseList";
import ItemSelected from "./components/ItemSelected";

function App() {
  return (
    <AppProvider>
      <div className="container">
        <h1 className="mt-3">Company's Budget Allocation</h1>
        <div className="row mt--3">
          <div className="col-sm">
            <BudgetBar />
          </div>
        </div>
        <h3 className="mt-3">Allocation</h3>
        <div className="col-sm">
          <ExpenseList />
        </div>
        <h3 className="mt-3">Change allocation</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <ItemSelected />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
