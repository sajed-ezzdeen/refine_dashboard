import { AuthPage } from "@refinedev/antd";
import { Title } from "@/Credentials/Title";

export const Register = () => { 
 

  return (
  <AuthPage type="register"  
  title={<Title collapsed={false} />}
  formProps={{
    initialValues: { email: "", password: "" }, 
  }}
  
  /> 
)
  
};
