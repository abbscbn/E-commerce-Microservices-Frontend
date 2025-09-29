import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { identityService } from "../services/identityService";
import type { LoginRequest } from "../types/identity";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/authSlice";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // basic validation
    if (!username.trim()) {
      setErrorMsg("Kullanıcı adı boş olamaz");
      return;
    }
    if (username.length > 50) {
      setErrorMsg("Kullanıcı adı 50 karakterden uzun olamaz");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Şifre boş olamaz");
      return;
    }
    if (password.length > 300) {
      setErrorMsg("Şifre 300 karakterden uzun olamaz");
      return;
    }

    setErrorMsg(null); // hata resetle
    setLoading(true);

    try {
      const payload: LoginRequest = { username, password };
      const data = await identityService.login(payload);

      // token’ı localStorage’a yaz
      localStorage.setItem("token", data.token);

      // redux state'e ekle
      dispatch(setUser(data));

      // yönlendir
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setErrorMsg(
        err.response?.data?.apiError?.message ||
          err.message ||
          "Giriş başarısız. Tekrar deneyiniz."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Login Illustration"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                {/* Username input */}
                <div className="form-outline mb-4">
                  <label className="form-label fw-bold" htmlFor="usernameInput">
                    Kullanıcı Adı
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="usernameInput"
                    className="form-control form-control-lg"
                    placeholder="Kullanıcı adınızı giriniz..."
                  />
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label fw-bold" htmlFor="passwordInput">
                    Şifre
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="passwordInput"
                    className="form-control form-control-lg"
                    placeholder="Şifrenizi giriniz..."
                  />
                </div>

                {/* Error message */}
                {errorMsg && (
                  <div className="alert alert-danger py-2" role="alert">
                    {errorMsg}
                  </div>
                )}

                {/* Login button */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-warning btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-1">
                    Bir hesabınız yok mu?{" "}
                    <a href="/register" className="link-danger">
                      Kayıt Ol
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
