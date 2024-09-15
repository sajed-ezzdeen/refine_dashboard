import React from "react";

import { AuthPage } from "@refinedev/antd";

import { Title } from "@/Credentials/Title";

export const ForgotPassword: React.FC = () => {
  return <AuthPage type="forgotPassword" title={<Title collapsed={false} />} />;
};