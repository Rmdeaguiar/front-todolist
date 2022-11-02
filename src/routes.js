import Home from './Pages/Home';
import Login from './Pages/Login'
import SignUp from './Pages/SignUp';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { getItem } from './utils/storage';



function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />


            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>

    );
}

export default MainRoutes;