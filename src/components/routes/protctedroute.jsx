import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    return <Navigate to='/login' replace={true} />;
  }

  return children;
};
