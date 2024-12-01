import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import config from "../../config";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddUser from "../AddUser/AddUser";
import "./TableContents.css";
import { UserContext } from "../../context";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";


export default function TableContents() {
  const { users, setUsers, formData, setFormData } = useContext(UserContext);
  const navigate = useNavigate();

  const performApi = async () => {
    const response = await axios.get(config.endpoint);
    const result = response.data;
    setUsers(result);
    
  };

  const performDelete = async (id) => {
    try {
      const confirm = window.confirm("Would you like to delete?");
      if (confirm) {
        await axios.delete(`${config.endpoint}/${id}`);
        let updatedData = users.filter((user) => user.id !== id);
        setUsers(updatedData);

        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${config.endpoint}`, formData);
      const result = await response.data;

     
      setUsers((prev) => [...prev, { ...result }]);
      
      setFormData({ username: "", name: "", email: "", address: { city: "" } });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    performApi();
  }, []);

  return (
    <Box>
      <div className="form-container">
        <h3>Add User:</h3>
        <AddUser handleSubmit={handleSubmit} />
      </div>
      <TableContainer sx={{ marginLeft: "20px", marginRight: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>ID</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Username</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Name</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Email</h3>
              </TableCell>
              <TableCell align="center">
                <h3>City</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Actions</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.address?.city}</TableCell>
                <TableCell
                  align="center"
                  className="secondary-buttons"
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to={`${user.id}`}>
                    <Button
                      className="Edit-button"
                      variant="contained"
                      sx={{ backgroundColor: "#bac6f7", color: "#070333" }}
                    >
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#f7baba",color:"#4d0c03" }}
                    className="delete-button"
                    onClick={() => performDelete(user.id)}
                  >
                    <ClearIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}
