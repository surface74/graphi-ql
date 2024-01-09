const ValidationRule = {
  EMAIL: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w{2,}){1,}\s*$/gi,
  PASSWORD_UNICODE:
    /((?=.*\d)(?=.*\p{L})(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./!?]).{8,})/gu,
  BASE_URL: /^\s*http[s]?:\/\/[a-zA-Z\d.-]+[:]?[\d]{0,4}[\/]?[a-zA-Z\d\/-]+/,
};

export default ValidationRule;
