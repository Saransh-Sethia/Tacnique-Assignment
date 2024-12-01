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

      const value = {
        users,
        setUsers,
        formData,
        setFormData
      }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider
