import { useState } from "react";
import useAddTransactions from "../../hooks/useAddTransactions";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const Expense = () => {
  const { addTransaction } = useAddTransactions();
  const { transactions, total } = useGetTransactions();
  const navigate = useNavigate();
  const { name, profilePhoto } = useGetUserInfo();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  console.log();
  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      alert("Signed Out Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row justify-around items-start py-5">
      <div className="px-5 m-2 ">
        <div className="container ">
          <h1 className="text-3xl font-bold py-1">
            <span className="text-green-600"> {name.split(" ")[0]}'s </span>
            Expense Tracker
          </h1>

          <div className="py-4">
            <h3 className="text-xl font-semibold">Your Balance</h3>
            {total.tBalance >= 0 ? (
              <h2 className="text-xl font-semibold">Rs.{total.tBalance}</h2>
            ) : (
              <h2 className="text-xl font-semibold">-Rs.{total.tBalance}</h2>
            )}
          </div>
          <div className="py-3 text-md font-medium text-md ">
            <div>
              <h4 style={{ color: "green" }}>Income</h4>
              <p>Rs.{total.tIncome}</p>
            </div>
            <div className="py-3">
              <h4 style={{ color: "red" }}>Expenses</h4>
              <p>Rs.{total.tExpense}</p>
            </div>
          </div>
          <form
            action=""
            onSubmit={onSubmit}
            className="flex justify-center flex-col items-start gap-2 text-md  font-medium"
          >
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              className="outline-none bg-slate-200 px-2 p-1 rounded-md"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              className="outline-none bg-slate-200 px-2 p-1 mr-5 rounded-md"
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <div className="flex justify-start gap-1 items-center">
              {" "}
              <input
                type="radio"
                name=""
                id="expense"
                value="expense"
                checked={transactionType == "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense" className="pr-2">
                Expenses
              </label>{" "}
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                name=""
                id="income"
                value="income"
                checked={transactionType == "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>

            <button
              type="submit "
              className="bg-slate-200 p-2 rounded-lg px-5 font-semibold shadow-lg"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>

      <div className="px-3 m-2">
        <h3 className="px-5 m-2 text-2xl font-semibold mt-3">Transactions</h3>
        <div className="w-full flex flex-col gap-1 text-xs font-mono">
          {transactions ? (
            transactions.map((transaction) => {
              const { description, transactionAmount, transactionType } =
                transaction;
              return (
                <div
                  key={description}
                  className="flex gap-24 flex-row justify-between  items-center p-2 px-3 w-full  shadow-md   "
                >
                  <p className="font-bold text-sm"> {description} </p>
                  <h3 className="font-semibold">Rs.{transactionAmount} </h3>
                  <p
                    className="font-semibold"
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </p>
                </div>
              );
            })
          ) : (
            <div>Loading Transactions...</div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 px-5 m-2">
        <img src={profilePhoto} className="rounded-full " />
        <button
          className="bg-slate-200 p-2 rounded-lg px-5 font-semibold shadow-md"
          onClick={signUserOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Expense;
