import * as yup from "yup";

export const registerFormSchemas = yup.object().shape({
  username: yup
    .string()
    .min(3, "minumum 3 karakter")
    .max(50, "maximum 50 karakter")
    .required("kullanıcı adı alanı zorunludur"),
  email: yup
    .string()
    .max(300, "email uzunluğu maximum 50 karakter")
    .email("Email formatında olmak zorundadır")
    .required("Email alanı zorunludur"),
  password: yup
    .string()
    .min(6, "şifre en az 6 karakterli olmalıdır")
    .required("Şifre alanı zorunludur"),
  confirmPassword: yup
    .string()

    .required("Şifre tekrarı zorunludur")
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor"),
  term: yup.boolean().oneOf([true], "Hizmet şartlarını kabul etmelisiniz"),
});
