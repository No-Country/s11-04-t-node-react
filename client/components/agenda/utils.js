export const validationErrors = (form) => {
    const errors = {}

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const dominiosPermitidos = [
        'gmail.com',
        'hotmail.com',
        'yahoo.com',
        'yahoo.es',
        'outlook.com',
        'outlook.es',
    ]
    const dominiosPermitidosRegex = new RegExp(
        `^[a-zA-Z0-9._%+-]+@(${dominiosPermitidos.join('|')})$`,
        'i',
    )

    if (!form.name.length) {
        errors.name = 'Por favor ingresa tu nombre.'
    }

    if (!form.lastName.length) {
        errors.lastName = 'Por favor ingresa tu apellido.'
    }

    if (!form.celPhone.length) {
        errors.celPhone = 'Por favor ingresa tu telefono.'
    }

    if (!form.email.length) {
        errors.email = 'Por favor ingresa tu email.'
    }

    if (!regexEmail.test(form.email)) {
        errors.email = 'Por favor ingresa un email válido.'
    }

    if (!dominiosPermitidosRegex.test(form.email)) {
        errors.email = 'Por favor ingresa un dominio de email válido.'
    }


    return errors
}
