import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
        <div className="sidebar-brand-text mx-3">ADMİN PANEL</div>
      </Link>

      <hr className="sidebar-divider" />

      <li className="nav-item">
        <Link className="nav-link" to="/admin">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/admin/products">
          <i className="fas fa-fw fa-box"></i>
          <span>Ürünler</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
