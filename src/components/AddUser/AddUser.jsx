import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { UserContext } from "../../context";

const AddUser = ({handleSubmit}) => {
  const {formData, setFormData} = useContext(UserContext);


  const handleChange = (e)=> {
    const {name, value} = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
          ...prev,
          address: {
              ...prev.address,
              [addressField]: value
          }
      }))
    } else {
      setFormData((prev)=>({...prev, [name]:value}))
    }
    
  }
  return (
    <Box className="add-user">
      <TextField 
      type="string"
      required sx={{marginRight:'15px'}} 
      size='small' 
      id="outlined-required" 
      label="Username"
      name="username" 
      value={formData.username}
      onChange={handleChange}
       />
      <TextField 
      type="string"
      required sx={{marginRight:'15px'}} 
      size='small' 
      id="outlined-required" 
      label="Name" 
      name="name"
      value={formData.name}
      onChange={handleChange}
       />
      <TextField 
      required sx={{marginRight:'15px'}} 
      type="email"
      size='small' 
      id="outlined-required" 
      label="Email" 
      name="email"
      value={formData.email}
      onChange={handleChange}
       />
      <TextField 
      type="string"
      required sx={{marginRight:'15px'}} 
      size='small' 
      id="outlined-required" 
      label="City" 
      name="address.city"
      value={formData.address.city}
      onChange={handleChange}
       />
      <Button variant='contained' sx={{backgroundColor:"#03136b", color:"#ffffff", fontSize:'14px'}} onClick={(e)=>handleSubmit(e)}>Add</Button>
    </Box>
  );
};

export default AddUser;

