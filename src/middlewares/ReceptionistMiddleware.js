import { useHistory } from 'react-router-dom';

const ReceptionistMiddleware = (Component) => {
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);

  if (user.role_id !== 7) {
    // Redirect to unauthorized page or show an error message
    history.push('/unauthorized');
  }

  return <Component />;
};

export default ReceptionistMiddleware;