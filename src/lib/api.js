export async function getUsers() {
    try {
      const response = await fetch("https://mocki.io/v1/e0d8a81b-6610-45b7-9215-97532399b18d");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data.users)) {
        return data.users;
      } else {
        console.error("API did not return an array of users:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }