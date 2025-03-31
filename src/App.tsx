import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NewAdmin from "./pages/NewAdmin";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import AdminAccount from "./pages/AdminAccount";
// import Navbar from './components/Navigation';
import ForgetPassword from "./pages/ForgetPassword";
import ForgetEmail from "./pages/ForgetEmail";
import NewPatient from "./pages/PatientForm/NewPatient";
import Settings from "./pages/Settings";
import BathroomLightsChart from "./pages/ProgressGraph";
import ChangeUserInformation from "./pages/ChangeUserInformation";
import "react-datepicker/dist/react-datepicker.css";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            {/* Pass isLoggedIn state to Navbar */}
            {/* <Navbar loggedIn={isLoggedIn} /> */}

            {/* Route Configuration */}
            <Routes>
              <Route path="/" element={<Login login={setIsLoggedIn} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/account" element={<AdminAccount />} />
              <Route path="/newadmin" element={<NewAdmin />} />
              <Route path="/forgotPass" element={<ForgetPassword />} />
              <Route path="/forgotEmail" element={<ForgetEmail />} />
              <Route path="/newpatient" element={<NewPatient />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/progressGraph" element={<BathroomLightsChart />} />
              <Route
                path="/changeuserinformation"
                element={<ChangeUserInformation />}
              />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
