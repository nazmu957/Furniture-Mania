import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminSellerRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    // const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if(loading ){
        return <Loading></Loading>
    }
    if(user ){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AdminSellerRoutes;