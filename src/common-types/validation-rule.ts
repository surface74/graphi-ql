const ValidationRule = {
  EMAIL: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim,
  PASSWORD_UNICODE:
    /((?=.*\d)(?=.*\p{L})(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./!?]).{8,})/gu,
};

export default ValidationRule;
