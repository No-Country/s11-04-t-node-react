const baseUrl = 'https://barberbuddy.fly.dev/api/v1/barber'

//GET
export const getBarbers = async (token) => {
	try {
		const response = await fetch(`${baseUrl}/barbers-with-services`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}

export const getBarber = async (token, id, role) => {
	try {
		let response
		if (role === 'barber') {
			console.log(typeof id)
			response = await fetch(`${baseUrl}/get-me/${id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} else {
			response = await fetch(`${baseUrl}/get-barber/${id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

//POST
export const createBarber = async (token, newBarber) => {
	try {
		const response = await fetch(`${baseUrl}/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newBarber),
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

//PUT
export const updateBarber = async (token, barberToModify, role) => {
	try {
		let response
		if (role === 'barber') {
			response = await fetch(`${baseUrl}/modify-me/${barberToModify._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(barberToModify),
			})
		} else {
			response = await fetch(`${baseUrl}/modify/${barberToModify._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(barberToModify),
			})
		}

		// Solicitar barbero modificado al server
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

//DELETE
export const deleteBarber = async (token, id) => {
	try {
		const response = await fetch(`${baseUrl}/delete/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}
