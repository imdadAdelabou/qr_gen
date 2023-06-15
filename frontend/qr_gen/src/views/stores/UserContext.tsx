import { createContext, useContext, useState } from "react";
import { UserContextType, UserType } from "../../helpers/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (children: JSX.Element) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

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

export const useUser = () => useContext(UserContext);
