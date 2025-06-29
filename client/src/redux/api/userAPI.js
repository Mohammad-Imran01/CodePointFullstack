import { API, handleApiError } from "./utils";

const REACT_APP_GUEST_KEYWORD = process.env.REACT_APP_GUEST_KEYWORD || 'GUEST_KEYWORD'
const headerForGuest = () => {
  return {
    Authorization: `Bearer ${REACT_APP_GUEST_KEYWORD}`,
    "Content-Type": "application/json",
  };
}

export const getUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUser = async (id, formData) => {
  try {
    const { data } = await API.put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPublicUsers = async () => {
  try {
    // const { data } = await API.get("/users/public-users");
    const { data } = await API.get("/users/public-users", { headers: headerForGuest() });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
export const getPublicUser = async (id) => {
  try {
    // const { data } = await API.get(`/users/public-users/${id}`);
    const { data } = await API.get(`/users/public-users/${id}`, { headers: headerForGuest() });
    console.log(data)
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const followUser = async (id) => {
  try {
    const { data } = await API.patch(`/users/${id}/follow`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const unfollowUser = async (id) => {
  try {
    const { data } = await API.patch(`/users/${id}/unfollow`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getFollowingUsers = async () => {
  try {
    const { data } = await API.get("/users/following");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
