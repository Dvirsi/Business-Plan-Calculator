import { useEffect, useState } from "react";

function BusinessPlan() {
  const [investment, setInvestment] = useState({
    rent: 0,
    purchase: 0,
    rentReady: 0,
    commission: 0,
    closingCost: 0,
  });

  const [totalInvestment, setTotalInvestment] = useState(0);

  const [expenses, setExpenses] = useState({
    cityTaxes: 0,
    schoolTaxes: 0,
    insurance: 0,
    propertyManagement: 0,
  });

  const [address, setAddress] = useState("");

  useEffect(() => {
    setTotalInvestment(
      investment.purchase +
        investment.rentReady +
        investment.commission +
        investment.closingCost
    );
  }, [investment]);

  useEffect(() => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      propertyManagement: investment.rent * 0.1,
    }));
  }, [investment.rent]);

  useEffect(() => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      totalExpenses:
        expenses.cityTaxes +
        expenses.schoolTaxes +
        expenses.insurance +
        expenses.propertyManagement,
    }));
  }, [
    expenses.cityTaxes,
    expenses.schoolTaxes,
    expenses.insurance,
    expenses.propertyManagement,
  ]);

  const [netIncome, setNetIncome] = useState({ monthly: 0, annual: 0 });
  const [capRate, setCapRate] = useState(0);

  useEffect(() => {
    setNetIncome((prevNetIncome) => ({
      ...prevNetIncome,
      monthly: investment.rent - expenses.totalExpenses,
      annual: (investment.rent - expenses.totalExpenses) * 12,
    }));
    setCapRate();
  }, [expenses.totalExpenses]);

  return (
    <div>
      <form>
        Address :
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        <br />
        Purchase :{" "}
        <input
          type="text"
          onChange={(e) =>
            setInvestment((prevState) => ({
              ...prevState,
              purchase: +e.target.value,
            }))
          }
        />{" "}
        <br />
        Estimated Rent ready Costs :{" "}
        <input
          type="text"
          onChange={(e) =>
            setInvestment((prevState) => ({
              ...prevState,
              rentReady: +e.target.value,
            }))
          }
        />{" "}
        <br />
        Commission :{" "}
        <input
          type="text"
          value={investment.commission}
          onChange={(e) =>
            setInvestment((prevState) => ({
              ...prevState,
              commission: +e.target.value,
            }))
          }
        />{" "}
        <br />
        Closing costs :{" "}
        <input
          type="text"
          value={investment.closingCost}
          onChange={(e) =>
            setInvestment((prevState) => ({
              ...prevState,
              closingCost: +e.target.value,
            }))
          }
        />{" "}
        <br />
        Total Investment : {totalInvestment}
      </form>
    </div>
  );
}

export default BusinessPlan;
