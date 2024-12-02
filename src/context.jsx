import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

export const UserContext = createContext(null);

const UserContextProvider = ({children}) => {
    const {id} = useParams()

    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id:id,
        username: "",
        name: "",
        email: "",
        address: {
            city:""
        },
      });



      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      const value = {
        users,
        setUsers,
        formData,
        setFormData,
        emailRegex
      }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider
