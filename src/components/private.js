import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('email') !== null;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;