export const _require = {
  required: {
    value: true,
    message: "không được để trống",
  },
};

export const requireLength = {
  minLength: {
    value: 1,
    message: "phải nhiều hơn 1 ký tự",
  },
  maxLength: {
    value: 35,
    message: "phải ít hơn 35 ký tự",
  },
};

export const emailValidation = {
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Email không hợp lệ",
  },
};

// Regex pattern cho số điện thoại Việt Nam
export const phoneValidation = {
  pattern: {
    value: /^(0|\+84)[1-9][0-9]{8,9}$/,
    message: "Số điện thoại không hợp lệ",
  },
};

// Regex pattern tổng hợp cho email hoặc số điện thoại
export const emailOrPhoneValidation = {
  pattern: {
    value: /^(0|\+84)[1-9][0-9]{8,9}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Email hoặc số điện thoại không hợp lệ",
  },
};

export const passwordValidation = {
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_!@#$%^&*()-+=]{8,}$/,
    message: "phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số",
  },
};

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_!@#$%^&*()-+=]{8,}$/;
