const baseUrl = 'https://barberbuddy.fly.dev/api/v1/barber'
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYXJiZXJJZCI6IjY1MjZkYzI1ZTkwZmEzYWU1ZDFlMTc2ZSIsImlhdCI6MTY5NzQxODE3MSwiZXhwIjoxNjk3NTA0NTcxfQ.3U3bGrtCI74ENdmlgCP8c7lzXKGIff3UMcn6OSMF6XY'
const bearerToken = `Bearer ${token}`

//GET
export const getBarbers = async () => {
	try {
		const response = await fetch(`${baseUrl}/barbers-with-services`, {
			method: 'GET',
			headers: {
				Authorization: bearerToken,
			},
		})

		const data = await response.json()

		return data
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
		return data
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
				'Content-Type': 'application/json',
				Authorization: bearerToken,
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
export const updateBarber = async (barberToModify) => {
	try {
		const response = await fetch(`${baseUrl}/modify/${barberToModify._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: bearerToken,
			},
			body: JSON.stringify(barberToModify),
		})
		// Solicitar barbero modificado al server
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

//DELETE
export const deleteBarber = async (id) => {
	try {
		const response = await fetch(`${baseUrl}/delete/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: bearerToken,
			},
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}
