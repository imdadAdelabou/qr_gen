import { createContext, useState } from "react";
import { UserContextType, UserType } from "../../helpers/types";
import React from "react";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [user, setUser] = useState<UserType | null>({
    token: localStorage.getItem("userToken"),
  });

  console.log(user?.token, "from context");

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser: (data: UserType) =>
          setUser((prevUser) => ({ ...prevUser, ...data })),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
