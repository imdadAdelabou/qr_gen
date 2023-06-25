import { createContext, useState } from "react";
import { UserContextType, UserType } from "../../helpers/types";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [user, setUser] = useState<UserType | null>({
    token: localStorage.getItem("userToken"),
  });
  const  updateUser = (data: UserType) =>
  setUser((prevUser) => ({ ...prevUser, ...data }));
 

  
  console.log(user?.token, "from context");

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
