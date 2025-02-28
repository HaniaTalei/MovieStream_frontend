

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { getUser } from '../services/auth';

// const AuthContext = createContext({
//   user: null,
//   loading: true,
//   loginUser: () => {},
//   logoutUser: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const saveUserToLocalStorage = (userData) => {
//     if (userData) {
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('token', userData.token);
//     }
//   };

//   const removeUserFromLocalStorage = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         }

//         if (localStorage.getItem('token')) {
//           const userData = await getUser();
//           if (userData) {
//             setUser(userData);
//             saveUserToLocalStorage(userData);
//           }
//         }
//       } catch (error) {
//         console.error('Load user error:', error);
//         setUser(null);
//         removeUserFromLocalStorage();
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const loginUser = (userData) => {
//     setUser(userData);
//     saveUserToLocalStorage(userData);
//   };

//   const logoutUser = () => {
//     setUser(null);
//     removeUserFromLocalStorage();
//   };

//   const contextValue = {
//     user,
//     loading,
//     loginUser,
//     logoutUser
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUser } from '../services/auth';

const AuthContext = createContext({
  user: null,
  loading: true,
  loginUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserToLocalStorage = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
    }
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getUser();
          if (userData) {
            setUser(userData);
            saveUserToLocalStorage(userData);
          } else {
            setUser(null);
            removeUserFromLocalStorage();
          }
        } else {
          setUser(null);
          removeUserFromLocalStorage();
        }
      } catch (error) {
        console.error('Load user error:', error);
        setUser(null);
        removeUserFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const loginUser = (userData) => {
    if (userData && userData.token) {
      setUser(userData);
      saveUserToLocalStorage(userData);
    }
  };

  const logoutUser = () => {
    setUser(null);
    removeUserFromLocalStorage();
  };

  const contextValue = {
    user,
    loading,
    loginUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};