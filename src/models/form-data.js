/**
 * @param {Object} obj
 * @return {FormData}
 */
export const toFormData = (obj) => {
  return Object.entries(obj).reduce((
    formData /* :Instance */,
    [key /* :string */, val /* :* */]
  ) => {
    formData.append(key, val)
    return formData
  }, new FormData())
}
