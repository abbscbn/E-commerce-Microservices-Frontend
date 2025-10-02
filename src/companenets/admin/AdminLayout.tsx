import React from "react";
import { Outlet, Link } from "react-router-dom";
import adminPic from "../../assets/images/profil.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, setUser } from "../../slices/authSlice";
import { clearBasket } from "../../slices/basketSlice";

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token / user bilgisini sil
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redux state sıfırla
    dispatch(clearUser());
    dispatch(clearBasket());

    // Login sayfasına yönlendir
  };
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="#"
        >
          <div className="sidebar-brand-icon rotate-n-15"></div>
          <div className="sidebar-brand-text mx-3">ADMİN PANEL</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to="/admin-dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Yönetim</div>
        <li className="nav-item">
          <Link className="nav-link" to="/admin-dashboard/products">
            <i className="fas fa-fw fa-box" />
            <span>Ürünler</span>
          </Link>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block" />
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    Admin
                  </span>
                  <img className="img-profile rounded-circle" src={adminPic} />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <a className="dropdown-item" href="#">
                    Profil
                  </a>
                  <a className="dropdown-item" href="#">
                    Ayarlar
                  </a>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Çıkış Yap
                  </button>
                </div>
              </li>
            </ul>
          </nav>

          {/* Page Content */}
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer className="sticky-footer bg-white"></footer>
      </div>
    </div>
  );
}

export default AdminLayout;
