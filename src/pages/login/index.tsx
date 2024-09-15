import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";
import { Title } from '@/Credentials/Title';


export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
      title={<Title collapsed={false} />}

    />
  );
};  
 