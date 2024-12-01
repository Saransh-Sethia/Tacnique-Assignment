import React, { useContext, useEffect, useState } from "react";
import "./UserEdit.css";
import { Box, Button, TableCell, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const UserEdit = () => {
  const { users, setUsers } = useContext(UserContext);
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({
    id: id,
    username: "",
    name: "",
    email: "",
    address: {
      city: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setUpdateData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setUpdateData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(config.endpoint + id);
      const result = response.data;
      setUpdateData(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (editedUser) => {
    try {
      if (
        updateData.username.length === 0 ||
        updateData.name.length === 0 ||
        updateData.email.length === 0 ||
        updateData.address.city.length === 0
      ) {
        alert("Kindly Fill all the details");
        return;
      }
      const response = await axios.put(
        `${config.endpoint}/${editedUser.id}`,
        editedUser
      );
      const result = await response.data;
      

      return result;
    } catch (error) {
      console.log("error", error);
      throw error
    }
  }
  const editUserHandler = (updateData) => {
    let existingUser = users.find((user) => user.id === Number(updateData.id));

    
      if (existingUser) {

        handleSubmit(updateData).then(() => {
            setUsers((prev) =>
                prev.map((user) => (user.id === Number(updateData.id) ? { ...user, ...updateData } : user))
            );
        }).catch((error) => {
            console.error("Error updating user:", error);
        });
        navigate("/")
    } else {
    
      setUsers((prev) =>
        prev.map((user) =>
          user.id === Number(updateData.id) ? { ...user, ...updateData } : user
        )
      );
      navigate("/");
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box className="update">
        <TextField
          disabled
          required
          type="number"
          sx={{ marginRight: "15px" }}
          size="small"
          id="outlined-required"
          label="ID"
          value={updateData.id}
        />
        <br />
        <br />
        <TextField
          required
          sx={{ marginRight: "15px" }}
          size="small"
          id="outlined-required"
          label="Username"
          name="username"
          value={updateData.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          required
          sx={{ marginRight: "15px" }}
          size="small"
          id="outlined-required"
          label="Name"
          name="name"
          value={updateData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          required
          sx={{ marginRight: "15px" }}
          size="small"
          id="outlined-required"
          label="Email"
          name="email"
          value={updateData.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          required
          sx={{ marginRight: "15px" }}
          size="small"
          id="outlined-required"
          label="City"
          name="address.city"
          value={updateData.address.city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"8px", fontWeight:"500"}}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#02034d",color:"#d6d7ff",fontWeight:"600" }}
          onClick={() => editUserHandler(updateData)}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#f7baba", color:"#8a0b0b", fontWeight:"600" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserEdit;

