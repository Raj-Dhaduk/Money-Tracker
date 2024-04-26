import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  
  // const url = process.env.REACT_APP;

  useEffect(() => {
    const url = process.env.REACT_APP;

    async function getTransactions() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    getTransactions();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const [price, ...descriptionParts] = name.split(" ");
    const description = descriptionParts.join(" ");

    try {
      const response = await axios.post(
        "/api/transaction",
        {
          price,
          name: description,
          description,
          datetime,
        },
        { headers: { "Content-type": "application/json" } }
      );

      setName("");
      setDescription("");
      setDatetime("");
      console.log("Result:", response.data);
      // Update transactions state to display the newly added transaction
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        response.data,
      ]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }
  let balance = 0
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      balance += transactions[i].price
    } else {
      balance -= transactions[i].price
    }
 
  }

  balance = balance.toFixed(2)
  const franc = balance.split('.')[1]
  balance=balance= balance.split('.')[0]
    
  
   


  return (
    <main>
      <h1>
        ${balance}<span>{ franc}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="+100 new laptops"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            placeholder="Date and Time"
          />
        </div>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </div>

        <button type="submit">Add your transaction</button>
      </form>

      <div className="transactionss">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div className="transaction" key={transaction.id}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No transactions available</div>
        )}
      </div>
    </main>
  );
}

export default App;
