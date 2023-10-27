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

export const hours = [
  {
    time: '00:00',
  },
  {
    time: '00:30',
  },
  {
    time: '01:00',
  },
  {
    time: '01:30',
  },
  {
    time: '02:00',
  },
  {
    time: '02:30',
  },
  {
    time: '03:00',
  },
  {
    time: '03:30',
  },
  {
    time: '04:00',
  },
  {
    time: '04:30',
  },
  {
    time: '05:00',
  },
  {
    time: '05:30',
  },
  {
    time: '06:00',
  },
  {
    time: '06:30',
  },
  {
    time: '07:00',
  },
  {
    time: '07:30',
  },
  {
    time: '08:00',
  },
  {
    time: '08:30',
  },
  {
    time: '09:00',
  },
  {
    time: '09:30',
  },
  {
    time: '10:00',
  },
  {
    time: '10:30',
  },
  {
    time: '11:00',
  },
  {
    time: '11:30',
  },
  {
    time: '12:00',
  },
  {
    time: '12:30',
  },
  {
    time: '13:00',
  },
  {
    time: '13:30',
  },
  {
    time: '14:00',
  },
  {
    time: '14:30',
  },
  {
    time: '15:00',
  },
  {
    time: '15:30',
  },
  {
    time: '16:00',
  },
  {
    time: '16:30',
  },
  {
    time: '17:00',
  },
  {
    time: '17:30',
  },
  {
    time: '18:00',
  },
  {
    time: '18:30',
  },
  {
    time: '19:00',
  },
  {
    time: '19:30',
  },
  {
    time: '20:00',
  },
  {
    time: '20:30',
  },
  {
    time: '21:00',
  },
  {
    time: '21:30',
  },
  {
    time: '22:00',
  },
  {
    time: '22:30',
  },
  {
    time: '23:00',
  },
  {
    time: '23:30',
  }
]

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
