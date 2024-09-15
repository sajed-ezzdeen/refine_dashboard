import React from "react";

import { AuthPage } from "@refinedev/antd";

import { Title } from "@/Credentials/Title";

export const UpdatePassword: React.FC = () => {
  return <AuthPage type="updatePassword" title={<Title collapsed={false} />} />;
};