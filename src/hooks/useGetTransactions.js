import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import useGetUserInfo from "./useGetUserInfo";

const useGetTransactions = () => {
  const { userId } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");
  const [transactions, settransactions] = useState([]);
  const [total, setTotal] = useState({
    tBalance: 0,
    tExpense: 0,
    tIncome: 0,
  });

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot, i) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactionType == "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        settransactions(docs);
        let tBalance = totalIncome - totalExpense;
        setTotal({
          tBalance,
          tExpense: totalExpense,
          tIncome: totalIncome,
        });
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, total };
};

export default useGetTransactions;
