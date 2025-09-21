import React, { useState } from "react";

function Login() {
  const [username, Setusername] = useState<string>("");
  const [password, SetPassword] = useState<string>("");

  const checkInfo = () => {
    const payload = {
      username: username,
      password: password,
    };

    if (payload.username?.trim() == "") {
      alert("kullanıcı adı kısmı boş olamaz");
      return;
    }
    if (payload.username.length > 50) {
      alert("username 50 karakterden büyük olamaz");
      return;
    }
    if (payload.password.length > 300) {
      alert("şifre 300 karakterden büyük olamaz");
      return;
    }
    if (payload.password?.trim() == "") {
      alert("şifre kısmı boş olamaz");
      return;
    }

    console.log(payload);
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
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                {/* Email input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Kullanıcı Adı
                  </label>
                  <input
                    onChange={(e) => {
                      Setusername(e.target.value);
                    }}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Kullanıcı adınızı giriniz..."
                  />
                </div>
                {/* Password input */}
                <div data-mdb-input-init="" className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Şifre
                  </label>
                  <input
                    onChange={(e) => {
                      SetPassword(e.target.value);
                    }}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Şifrenizi giriniz..."
                  />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={checkInfo}
                    type="button"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-warning btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Giriş Yap
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-1">
                    Bir hesabınız yok mu?{" "}
                    <a href="#!" className="link-danger">
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
