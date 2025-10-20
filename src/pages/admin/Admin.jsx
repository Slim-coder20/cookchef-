import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AdminNav from "./components/AdminNav/AdminNav";

export default function Admin() {
  return (
    <div className="d-flex flex-fill p-20">
      <AdminNav />
      <div className=" d-flex flex-column flex-fill">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
