import { UserDataFromApi } from "../components/pages/Login/Login.static";

export const softDelete = async (
  id: string,
  user: UserDataFromApi,
  url: string
) => {
  const deleteRes = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${user.access_token}` },
  });

  if (!deleteRes.ok) {
    const errorData = await deleteRes.json();
    console.error("Server error:", errorData);
    throw new Error(errorData.message);
  }
};

export const permDelete = async (
  id: string,
  user: UserDataFromApi,
  url: string
) => {
  const deleteRes = await fetch(`${url}/perm-delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${user.access_token}` },
  });

  if (!deleteRes.ok) {
    const errorData = await deleteRes.json();
    console.error("Server error:", errorData);
    throw new Error(errorData.message);
  }
};
