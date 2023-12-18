const ValidationRule = {
  EMAIL: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w{2,}){1,}\s*$/gi,
  PASSWORD_UNICODE:
    /((?=.*\d)(?=.*\p{L})(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./!?]).{8,})/gu,
};

export default ValidationRule;
