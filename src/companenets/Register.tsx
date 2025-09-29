import { useFormik } from "formik";
import { registerFormSchemas } from "../form/RegisterFormSchemas";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { identityService } from "../services/identityService";
import type { RegisterRequest } from "../types/identity";
import { useNavigate } from "react-router-dom";

interface MyFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  term: boolean;
}

function Register() {
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik<MyFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      term: false,
    },
    validationSchema: registerFormSchemas, // <-- Burada kullan
    // <-- İstersen açabilirsin
    onSubmit: async (values) => {
      try {
        // ConfirmPassword ve term backend’e gitmeyecek
        const payload: RegisterRequest = {
          username: values.username,
          email: values.email,
          password: values.password,
        };

        const res = await identityService.register(payload);

        console.log(res);

        setErrorMsg(null);
        setOpen(true);
        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err: any) {
        // unwrapResponse sayesinde backend'den gelen hata throw ediliyor
        // burada err zaten ApiError tipinde
        setErrorMsg(err.message);
      }
    },
  });

  return (
    <div>
      <section style={{ backgroundColor: "#ffffffff" }}>
        <div className="container h-100 mt-3">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Kayıt Formu
                      </p>
                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Kullanıcı adı
                            </label>
                            <input
                              name="username"
                              type="text"
                              id="username"
                              className="form-control"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-danger">
                              {errors.username && touched.username && (
                                <p>{errors.username}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              E-mail
                            </label>
                            <input
                              name="email"
                              type="email"
                              id="email"
                              className="form-control"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-danger">
                              {errors.email && touched.email && (
                                <p>{errors.email}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Şifre
                            </label>
                            <input
                              name="password"
                              type="password"
                              id="password"
                              className="form-control"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-danger">
                              {errors.password && touched.password && (
                                <p>{errors.password}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Şifre Tekrarı
                            </label>
                            <input
                              name="confirmPassword"
                              type="password"
                              id="confirmPassword"
                              className="form-control"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-danger">
                              {errors.confirmPassword &&
                                touched.confirmPassword && (
                                  <p>{errors.confirmPassword}</p>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5 flex-column">
                          <div className="form-check text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="term"
                              name="term"
                              checked={values.term}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label className="form-check-label" htmlFor="term">
                              Hizmet şartlarını kabul ediyorum
                            </label>
                          </div>
                          <div className="text-center text-danger">
                            {errors.term && touched.term && (
                              <p>{errors.term}</p>
                            )}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-warning btn-lg"
                          >
                            Kayıt Ol
                          </button>
                        </div>
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
                          Kayıt başarılı!
                        </Alert>
                      </Snackbar>

                      {/* Hata */}
                      <Snackbar
                        open={!!errorMsg}
                        autoHideDuration={4000}
                        onClose={() => setErrorMsg(null)}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      >
                        <Alert
                          onClose={() => setErrorMsg(null)}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          {errorMsg}
                        </Alert>
                      </Snackbar>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
