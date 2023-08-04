import Main from '../../Layout/Main'
import Home from '../../Pages/Home/Home/Home'
import Login from '../../Pages/Login/Login'
import Blog from '../../Pages/Blog/Blog'
import { createBrowserRouter } from 'react-router-dom'
import SignUp from '../../Pages/SignUp/SignUp'
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import UsedProducts from '../../Pages/UsedProducts/UsedProducts'
import DashboardLayout from '../../Layout/DashboardLayout'
import MyOrders from '../../Pages/Dashboard/MyOrders/MyOrders'
import AllBuyers from '../../Pages/Dashboard/AllBuyers/AllBuyers'
import AllSellers from '../../Pages/Dashboard/AllSellers/AllSellers'
import AdminRoutes from '../AdminRoutes/AdminRoutes'

import AddProduct from '../../Pages/Dashboard/AddProduct/AddProduct'
import MyProducts from '../../Pages/Dashboard/MyProducts/MyProducts'
import ReportProducts from '../../Pages/Dashboard/Dashboard/ReportProducts/ReportProducts'
import Payment from '../../Pages/Dashboard/Dashboard/Payment/Payment'
import ErrorDisplay from '../../Pages/Shared/ErrorDisplay/ErrorDisplay'
import NotFound from '../../Pages/NotFound/NotFound'
import Products from '../../Pages/Home/Products/Products'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorDisplay></ErrorDisplay>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://used-products-server.vercel.app/categories'),
      },
      {
        path: '/blog',
        element: <Blog></Blog>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>,
      },
      {
        path: '*',
        element: <NotFound></NotFound>,
      },
      {
        path: '/category/:id',
        element: (
          <PrivateRoute>
            <UsedProducts></UsedProducts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://used-products-server.vercel.app/categories/${params.id}`,
          ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorDisplay></ErrorDisplay>,
    children: [
      {
        path: '/dashboard',
        element: <MyOrders></MyOrders>,
      },
      {
        path: '/dashboard/allbuyers',
        element: (
          <AdminRoutes>
            <AllBuyers></AllBuyers>
          </AdminRoutes>
        ),
      },
      {
        path: '/dashboard/allsellers',
        element: (
          <AdminRoutes>
            <AllSellers></AllSellers>
          </AdminRoutes>
        ),
      },
      {
        path: '/dashboard/addproducts',
        element: <AddProduct></AddProduct>,
      },
      {
        path: '/dashboard/myproducts',
        element: <MyProducts></MyProducts>,
      },
      {
        path: '/dashboard/repoortproducts',
        element: <ReportProducts></ReportProducts>,
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://used-products-server.vercel.app/bookings/${params.id}`,
          ),
      },
    ],
  },
])

export default router
