import axios from "axios";
import { serverUrl } from "../../config/info";
async function createUser({ username, email, password, co_password, file }) {
  const form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("password", password);
  form.append("co_password", co_password);
  form.append("file", file);
  try {
    const result = await axios.post(`${serverUrl}/create`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      status: result.status,
      data: result.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export { createUser };
