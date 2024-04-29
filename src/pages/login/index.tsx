import { AuthPage } from '@refinedev/antd';
import { authCredentials } from '../../providers';

// const demoCredentials = { email: 'demo@refine.dev', password: 'demodemo' };

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
