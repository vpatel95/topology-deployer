import React from 'react';
import AuthService from 'services/auth';
import UserService from 'services/user';

// Initial state
const initUser = {
  info: AuthService.getCurrentUser(),
  objects: {
    topologies: {},
    networks: {},
    vms: {}
  }
};

// Action Type
const UserActions = {
  SET_INFO: 0,
  SET_OBJS: 1,
  SET_TOPOLOGIES: 2,
  SET_NETWORKS: 3,
  SET_VMS: 4,
};

// Reducer
const reducer = (user, action) => {
  console.log("Inside reducer : ", action);
  console.trace();
  switch (action.type) {
    case UserActions.SET_INFO:
      return { ...user, info: action.payload };
    case UserActions.SET_OBJS:
      return { ...user, objects: action.payload };
    default:
      return user;
  }
};

// Create context and provider
const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  const [user, userDispatch] = React.useReducer(reducer, initUser);

  React.useEffect(() => {
    if (!user.info) {
      console.error("User not found");
      return;
    }

    UserService.getUserObjects(user.info.id).then(
      res => {
        userDispatch({type: UserActions.SET_OBJS, payload: res});
      },
      error => {
        const errMsg =
          (error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString();

        console.log("Fetch user Objects failed : ", errMsg);
      }
    );
  }, [user.info]);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using the user
const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser, UserActions };
