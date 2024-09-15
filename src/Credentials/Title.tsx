import React from "react";

interface TitleProps {
  collapsed: boolean;
}

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <div className="title">
      <h1>{collapsed ? "App" : "Dashboard"}</h1>
    </div>
  );
};
