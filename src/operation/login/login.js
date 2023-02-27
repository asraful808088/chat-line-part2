import axios from "axios";
import { serverUrl } from "../../config/info";
export default async function login(method, urlRoute, data, token) {
  let form = new FormData();
  if (typeof data === "object" && data instanceof Object) {
    for (let index = 0; index < Object.keys(data).length; index++) {
      form.append(Object.keys(data)[index], data[Object.keys(data)[index]]);
    }
  }
  try {
    const result = await axios[method](`${serverUrl}/${urlRoute}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    return {
      status: result.status,
      data: result.data,
    };
  } catch (error) {
    const errors = {};
    for (let index = 0; index < error.response.data.errors.length; index++) {
      errors[error.response.data.errors[index].param] =
        error.response.data.errors[index].msg;
    }
    return {
      status: error.response.status,
      data: errors,
    };
  }
}
