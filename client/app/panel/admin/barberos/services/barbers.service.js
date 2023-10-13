const baseUrl = 'https://barberbuddy.vercel.app/api/v1/barber'
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYXJiZXJJZCI6IjY1Mjk2YjkzZmU3ZGM0YWI4MGFiZWZlNSIsImlhdCI6MTY5NzIxNDg1OSwiZXhwIjoxNjk5ODA2ODU5fQ.GP6BhKRsRzSWLCTX7BcLU-UP46DSy44Wz2hpE6LYG5M'
const bearerToken = `Bearer ${token}`

//GET
export const getBarbers = async () => {
	try {
		const response = await fetch(`${baseUrl}/get-barbers`, {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})
		const data = await response.json()
		return data.barbers
	} catch (error) {
		console.log(error)
	}
}

export const getBarber = async (id) => {
	try {
		const response = await fetch(`${baseUrl}/get-barber/${id}`, {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})
		const data = await response.json()
		return data.results
	} catch (error) {
		console.log(error)
	}
}

//POST
export const createBarber = async (newBarber) => {
	try {
		const response = await fetch(`${baseUrl}/create`, {
			method: 'POST',
			headers: {
				Authorization: bearerToken,
			},
			body: newBarber,
		})
		const data = await response.json()
		console.log(data)
		return data.results
	} catch (error) {
		console.log(error)
	}
}

//PUT
export const updateBarber = async (id, barberToModify) => {
	try {
		const response = await fetch(`${baseUrl}/modify/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: bearerToken,
			},
			body: barberToModify,
		})
		// Solicitar barbero modificado al server
		const data = await response.json()
		return data.results
	} catch (error) {
		console.log(error)
	}
}

//DELETE
export const deleteBarber = async (id) => {
	try {
		await fetch(`${baseUrl}/delete/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: bearerToken,
			},
		})
		return
	} catch (error) {
		console.log(error)
	}
}
