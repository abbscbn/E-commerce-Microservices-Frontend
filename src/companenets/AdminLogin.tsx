import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import adminPic from "../assets/images/admin.png";
import { identityService } from "../services/identityService";
import type { LoginRequest } from "../types/identity";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [autherror, Setautherror] = useState<string | null>("");
  const dispatch = useAppDispatch();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username)
      setErrors((prev) => ({ ...prev, username: undefined }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password)
      setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Hata objesini sıfırla
    const newErrors: { username?: string; password?: string } = {};

    // Validation
    if (!username.trim()) newErrors.username = "Kullanıcı adı boş olamaz!";
    if (!password.trim()) newErrors.password = "Şifre boş olamaz!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Form submit edilmez
    }

    const payload: LoginRequest = { username, password };

    setLoading(true);
    try {
      const res = await identityService.adminLogin(payload);
      localStorage.setItem("token", res.token);
      dispatch(setUser(res));
      console.log(res);
      setOpen(true);
      navigate("/admin-dashboard");
    } catch (err: any) {
      Setautherror(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-flex justify-content-center align-items-center p-3">
                    <img src={adminPic} alt="admin" className="img-fluid" />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Admin Panel</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className={`form-control form-control-user ${
                              errors.username ? "is-invalid" : ""
                            }`}
                            id="username"
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={handleUsernameChange}
                          />
                          {errors.username && (
                            <div className="invalid-feedback">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className={`form-control form-control-user ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            id="exampleInputPassword"
                            placeholder="Şifre"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                          disabled={loading}
                        >
                          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </button>
                        <hr />
                      </form>
                      {/* Başarılı */}
                      <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => setOpen(false)}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      >
                        <Alert
                          onClose={() => setOpen(false)}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Giriş Başarılı
                        </Alert>
                      </Snackbar>

                      {/* Hata */}
                      <Snackbar
                        open={!!autherror}
                        autoHideDuration={4000}
                        onClose={() => Setautherror(null)}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      >
                        <Alert
                          onClose={() => Setautherror(null)}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          {autherror}
                        </Alert>
                      </Snackbar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
