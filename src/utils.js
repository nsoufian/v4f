export const getErrorObject = rule => ({
  message: rule.options.message !== undefined ? rule.options.message : "",
  success: false
});
