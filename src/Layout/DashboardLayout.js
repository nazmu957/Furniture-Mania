import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    console.log(user);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        
                        {
                            !isAdmin && <>
                              <li><Link to="/dashboard">My Orders</Link></li>
                        <li><Link to="/dashboard/myproducts">My Products</Link></li>
                        <li><Link to="/dashboard/addproducts">Add A Product</Link></li>
                            </>
                        }
                        
                        
                        {
                          isAdmin &&   <>
                                
                                <li><Link to="/dashboard/allbuyers">All Buyers</Link></li>
                                <li><Link to="/dashboard/allsellers">All Sellers</Link></li>
                                <li><Link to="/dashboard/repoortproducts">Reported Item</Link></li>
                                
                               
                            </>
                        
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;