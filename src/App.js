import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ErrorBoundary } from "./ErrorBoundary";
import Todo from "./Todo";

function App() {
  const [final, setFinal] = useState([]);
  const [name, setUptname] = useState("");
  const [trfs, setUpttrfs] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const del = (id) => {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        alert("Your data has been deleted please click ok");
        employeesData();
      });
    });
  };
  useEffect(() => {
    employeesData();
  }, []);
  const employeesData = () => {
    fetch("http://localhost:3000/employees").then((data) => {
      data.json().then((result) => {
        setFinal(result);
        setUptname(result[0].name);
        setUpttrfs(result[0].trfs);
      });
    });
  }
  const giveUser = (id) => {
    // console.log(final[id - 1]);
    setUptname(final[id - 1].name);
    setUpttrfs(final[id - 1].trfs);
    setUpdateId(final[id - 1].id);
  };

  const UpdateTodo = () => {
    // console.log(name,trfs,updateId);
    let data = { name, trfs, updateId };

    fetch(`http://localhost:3000/employees/${updateId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        employeesData();
      });
    });
    alert("Your List is Updated");

  };
  return (
    <div className="App">
      <h2>Api Integration</h2>
      <ErrorBoundary>
        <Todo employeesData = {employeesData} />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="srno-head">Srno</TableCell>
                <TableCell className="name-head" align="right">
                  Name
                </TableCell>
                <TableCell align="right" className="status-head">
                  Status
                </TableCell>
                <TableCell className="actions-head" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {final.map((results) => (
                
                <TableRow  key={results.id}>
                  <TableCell className="srno" component="th" scope="row">
                    {results.id}
                  </TableCell>
                  <TableCell align="right" className="names">
                    {results.name}
                  </TableCell>
                  <TableCell align="right" className="status">
                    {results.trfs}
                  </TableCell>
                  <TableCell align="right" className="actions">
                    <button
                      className="btn btn-danger btn-edit"
                      onClick={() => del(results.id)}
                    >
                      Delete
                    </button>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      className="btn btn-primary btn-edit"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => giveUser(results.id)}
                    >
                      Update
                    </button>
                  </TableCell>
                </TableRow>
                
              ))}
            </TableBody>
          
          </Table>
        </TableContainer>
      </ErrorBoundary>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                value={name}
                onChange={(e) => setUptname(e.target.value)}
              />
              <br />
              <select value={trfs} onChange={(e) => setUpttrfs(e.target.value)}>
                <option>null</option>
                <option>Completed</option>
                <option>Incomplete</option>
              </select>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={UpdateTodo}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
