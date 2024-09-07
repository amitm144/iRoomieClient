const BASE_URL = "http://localhost:3001";

async function apiCall(endpoint, method = "GET", data = null, signal = null) {
  const url = `${BASE_URL}${endpoint}`;

  const options = {
    method,
    credentials: "include",
    signal,
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    console.error(`Error response:`, await response.text());
    const error = new Error("An error occurred while making the request");
    error.code = response.status;
    error.info = await response.json().catch(() => ({}));
    throw error;
  }

  return response.json();
}

export const auth = {
  testRoommate: () => apiCall("/auth/testRoommate"),
  testApartment: () => apiCall("/auth/testApartment"),
  initiateGoogleAuth: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },
  currentUser: () => apiCall("/auth/current-user"),
  completeRoommateRegistration: (data) =>
    apiCall("/auth/register/complete/roommate", "POST", data),
  completeApartmentRegistration: (data) =>
    apiCall("/auth/register/complete/apartment", "POST", data),
  logout: () => apiCall("/auth/logout"),
};

// User functions
export const users = {
  suggestions: () => apiCall(`/users/suggestions`),
  matches: () => apiCall(`/users/matches`),
  activity: () => apiCall(`/users/activity`),

  update: (data) => apiCall(`/users/update`, "PUT", data),
  preferences: (preferences) =>
    apiCall(`/users/preferences`, "PUT", preferences),
  action: ({ id, action }) => {
    return apiCall(`/users/action/${id}/?action=${action}`, "PUT");
  },
};



// User functions
export const roommates = {
  getAll: () => apiCall(`/roommates`),
  update: (roommateData) =>
    apiCall(`/roommates/update-roommate`, "PUT", roommateData),
  setPreferences: (updatedPreferences) =>
    apiCall(`/roommates/set-preferences`, "PUT", updatedPreferences),
  setAction: (apartmentId, action) =>
    apiCall(`/roommates/set-action/${apartmentId}/?action=${action}`, "PUT"),
  getMetaches: () => apiCall(`/roommates/getMatches`),
};

// Apartment functions
export const apartments = {
  getAll: () => apiCall(`/apartments`),
  setPreferences: (updatedPreferences) =>
    apiCall(`/apartments/set-preferences`, "PUT", updatedPreferences),
  setAction: (roommateId, action) =>
    apiCall(`/apartments/set-action/${roommateId}/?action=${action}`, "PUT"),
  update: (apartmentData) =>
    apiCall(`/apartments/update-apartment`, "PUT", apartmentData),
  delete: (apartmentId) => apiCall(`/apartments/${apartmentId}`, "DELETE"),
  getMetaches: () => apiCall(`/roommates/getMatches`),
};
