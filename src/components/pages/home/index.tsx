import React from "react";
import { HomeTemplate } from "components/templates/home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/model");
  }, [navigate]);

  return (
    <div>
      <HomeTemplate></HomeTemplate>
    </div>
  );
};
