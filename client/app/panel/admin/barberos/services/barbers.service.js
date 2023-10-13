const url = ''

//GET
export const getBarbers = async (token) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `bearer ${token}`,
			},
		})
		const data = await response.json()
		return data.results
	} catch (error) {
		console.log(error)
	}
}

export const getBarber = async (token, id) => {
	try {
		const response = await fetch(`url/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `bearer ${token}`,
			},
		})
		const data = await response.json()
		return data.results
	} catch (error) {
		console.log(error)
	}
}

//POST
export const createBarber = async (token, newBarber) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `bearer ${token}`,
			},
			body: newBarber,
		})
		const data = await response.json()
		return data.results
	} catch (error) {
		console.log(error)
	}
}

//PUT
export const updateBarber = async (token, id, barberToModify) => {
	try {
		const response = await fetch(`url/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: `bearer ${token}`,
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
export const deleteBarber = async (token, id) => {
	try {
		await fetch(`url/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `bearer ${token}`,
			},
		})
		return
	} catch (error) {
		console.log(error)
	}
}
