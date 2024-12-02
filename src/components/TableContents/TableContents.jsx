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
import Pagination from "../Pagination/Pagination";


export default function TableContents() {
  const { users, setUsers, formData, setFormData, emailRegex } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUsers, setCurrentUsers] = useState([]);
  const usersPerPage = 3;

  const performApi = async () => {
    const response = await axios.get(config.endpoint);
    const result = response.data;
    setUsers(result);
    setCurrentUsers(result);
  };

  useEffect(()=>{
let indexOfLastUser = currentPage * usersPerPage;
let indexOfFirstUser = indexOfLastUser - usersPerPage;

const userSlice = users.slice(indexOfFirstUser, indexOfLastUser);

if(userSlice.length === 0){
    setCurrentPage(1)
};

setCurrentUsers(userSlice)
  },[users, currentPage]);

  const previousPage = () => {
    if(currentPage > 1){
        setCurrentPage(currentPage - 1)
    }
  };

  const nextPage = (maxPageLength) => {
    if(currentPage < maxPageLength){
        setCurrentPage(currentPage + 1)
    }
  }

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
    if(formData.name?.length>2 && emailRegex.test(formData.email) && formData.address.city?.length>3){
      try {
        e.preventDefault();
  
        const response = await axios.post(`${config.endpoint}`, formData);
        const result = await response.data;
  
       
        setUsers((prev) => [...prev, { ...result }]);
        
        setFormData({ username: "", name: "", email: "", address: { city: "" } });
      } catch (error) {
        console.log("error", error);
        throw error
      }
    }else {
      alert("Please Provide a Valid input || Valid inputs are: 1. Username more than 2 words 2.Name more than 2 words 3. Valid Email  4. City more than 3 words ");
      return;
    }

  };

  useEffect(() => {
    performApi();
  }, []);

  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center", gap:"10px"}}>
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
            {currentUsers.map((user, id) => (
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
<Pagination 
previousPage={previousPage}
nextPage={nextPage}
currentPage={currentPage}
totalUsers={users.length}
usersPerPage={usersPerPage}
/>
    </Box>
  );
}
