import { instance } from "../instance/instance";

/***_______  get all users   ________**/
export async function getAllUser() {
  try {
    const { data } = await instance.get("/api/users/");
    return data;
  } catch (err) {
    return err.message || err;
  }
}
/***_______  get a single user    ________**/

export async function getUser(userId) {
  try {
    const { data } = await instance.get(`/api/users/${userId}`);
    return data;
  } catch (err) {
    return err.message || err;
  }
}
/***_______  add a user   ________**/

export async function addUser(formData) {
  const body = JSON.stringify(formData);
  const { data } = await instance.post("/api/users/", body, {
    headers: { "Content-Type": "application/json" },
  });
  // if geting any error
  if (data?.error) return Promise.reject(data.error);
  // send the success response
  return Promise.resolve(data);
}

/***_______   update the users  ________**/

export async function updateUser(userId, newData) {
  const willUpload = JSON.stringify(newData);
  const { data } = await instance.put(`/api/users/${userId}`, willUpload, {
    headers: { "Content-Type": "application/json" },
  });
  // if geting any error
  if (data?.error) return Promise.reject(data?.error);
  // send the success response
  return Promise.resolve(data);
}

/***_______   delete user  ________**/

export async function deleteUser(userId) {
  const { data } = await instance.delete(`/api/users/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (data?.error) return Promise.reject(data?.error);
  return Promise.resolve(data);
}
