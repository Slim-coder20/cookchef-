import React from "react";
import { Outlet } from 'react-router-dom'
import AdminNav from './components/AdminNav/AdminNav'

export default function Admin() {
  return (
    <div className="d-flex  flex-fill align-items-center  p-20">
      <AdminNav />
      <Outlet />
    </div>
  );
}
