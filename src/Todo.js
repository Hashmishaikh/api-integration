import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Todo.css";


const Todo = ({employeesData}) => {
  const [name, setName] = useState("");
  const [trfs, setTrfs] = useState("");
  const history = useHistory();
  const submits = () => {
    console.log(name, trfs);
    const data = { name, trfs };
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        employeesData()
  
      });
    });
    alert("Your List is Added");
    setName("");
    setTrfs("");
  };
  const logOut = () => {
    history.push("/login")
  }
  return (
    <div>

      <button className="btn btn-danger" onClick={logOut}>Logout</button><br/>
      <input
      className="input-name"
        type="text"
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
      />
      <br />
      <select
      className="select-input"
        value={trfs}
        onChange={(e) => setTrfs(e.target.value)}
        name="trfs"
      >
        <option>null</option>
        <option>Completed</option>
        <option>Incomplete</option>
      </select>
      <br />
      <br />

      <button className="button" onClick={submits}>ADD</button>    
    </div>
  );
};

export default Todo;
