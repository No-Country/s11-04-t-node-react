/////POST
export const createNewClient = async (token, newClient) => {
	try {
		const response = await fetch(`https://barberbuddy.fly.dev/api/v1/client/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newClient),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}



////GET
 export const getClients = async (token) => {
  try {
    const response = await fetch("https://barberbuddy.fly.dev/api/v1/client/get-all", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
	console.log('Response:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
	console.log(data);
    return data;
  } catch (error) {
    console.error('Error in getClients:', error);
    throw error; // Rethrow the error for the calling function to handle
  }
}; 



//PUT
export const updateClient = async (token, clientToUpdate) => {
	try {
			response = await fetch(`https://barberbuddy.fly.dev/api/v1/client/modify/${clientToUpdate._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(clientToUpdate),
			})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}