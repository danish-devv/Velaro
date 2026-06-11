import {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const AdminRoute = ({children}) => {
  const {user}=useContext(AuthContext)
  console.log(user)
  if(!user || ! user.isAdmin){
    return <Navigate to={"/"} replace/>
  }
  return children
}

export default AdminRoute