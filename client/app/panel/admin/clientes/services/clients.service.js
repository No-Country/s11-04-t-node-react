

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
    return data;
  } catch (error) {
    console.error('Error in getClients:', error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

/* 
//POST
export const createClient = async (token, newClient) => {
	try {
		const response = await fetch(`${baseUrl}/create`, {
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
} */


//PUT
export const updateBarber = async (token, clientToModify, role) => {
	try {
		let response
		if (role === 'barber') {
			response = await fetch(`${baseUrl}/modify-me/${clientToModify._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(barberToModify),
			})
		} else {
			response = await fetch(`${baseUrl}/modify/${clientToModify._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(barberToModify),
			})
		}
	} catch (error) {
		console.log(error)
	}
}
