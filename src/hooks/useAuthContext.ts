import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext