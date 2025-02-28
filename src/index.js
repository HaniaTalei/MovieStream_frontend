// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// // import { AuthProvider } from './context/AuthContext'; 
// import { AuthProvider } from "react-auth-kit"; 

// import "./index.css";
// import './styles/home.css';
// import './styles/login.css';
// import './styles/signup.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider> {}
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );



import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);



