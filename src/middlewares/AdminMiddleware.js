import { useHistory } from 'react-router-dom';

const AdminMiddleware = (Component) => {
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);

  if (user.role !== 'admin') {
    // Redirect to unauthorized page or show an error message
    history.push('/unauthorized');
  }

  return <Component />;
};

export default AdminMiddleware;