export const validate = (values, isSignup = false) => {
    const errors = {};

    const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid Email Format";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Must be 8+ characters with at least 1 number and 1 symbol";
    }

    if (isSignup && !values.name) {
      errors.name = "Name is Required";
    }

    return errors;
  };