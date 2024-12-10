import { format, isToday, addHours, startOfDay, parse, isValid } from 'date-fns'

export const getTimeSlotsFrom = (visitDate: string) => {
  const now = new Date()

  now.setMinutes(0, 0, 0)
  if (new Date().getMinutes() > 0) {
    now.setHours(now.getHours() + 1)
  }

  let startTime: Date
  const timeSlots: string[] = []

  if (isToday(visitDate)) {
    startTime = addHours(now, 2)
  } else {
    startTime = startOfDay(visitDate)
  }

  const endTime = new Date(visitDate)
  endTime.setHours(22, 0, 0, 0)

  let currentTime = startTime
  while (currentTime <= endTime) {
    timeSlots.push(format(currentTime, 'HH:mm'))
    currentTime = addHours(currentTime, 1)
  }

  return timeSlots
}

export const getTimeSlotsTo = (timeFrom: string): string[] => {
  const now = new Date()

  let startTime = new Date(now.setHours(0, 0, 0, 0))
  const endTime = new Date(now.setHours(23, 0, 0, 0))

  if (timeFrom) {
    const parsedTimeFrom = parse(timeFrom, 'HH:mm', new Date())
    if (isValid(parsedTimeFrom)) {
      startTime = addHours(parsedTimeFrom, 1)
    }
  }

  const timeSlots: string[] = []
  let currentTime = startTime

  while (currentTime <= endTime) {
    timeSlots.push(format(currentTime, 'HH:mm'))
    currentTime = addHours(currentTime, 1)
  }

  return timeSlots
}

export const convertToRoman = (num: number) => {
  const romanNumerals: [string, number][] = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ]

  let result = ''
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman
      num -= value
    }
  }
  return result
}

export interface Rules {
  required?: string
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  pattern?: { value: RegExp; message: string }
}

export const visitFieldsRules: { [key: string]: Rules } = {
  requestNumber: { required: 'Request Number is required' },
  visitType: { required: 'Visit Type is required' },
  specialization: { required: 'Specialization is required' },
  visitDate: { required: 'Date of visit is required' },
  isSpecificTime: {},
  visitTimeFrom: {},
  visitTimeTo: {},
  topic: { required: 'Topic is required' },
  additionalInformation: {},
  languageOfVisit: {},
}

export const patientFieldRules: { [key: string]: Rules } = {
  name: { required: 'Name is required' },
  surname: { required: 'Surname is required' },
  age: { required: 'Age is required' },
  symptoms: {},
  docType: { required: 'Document Type is required' },
  pesel: {
    required: 'PESEL is required',
    minLength: { value: 11, message: 'Min Length 11' },
    maxLength: { value: 11, message: 'Max Length 11' },
    pattern: { value: /^[0-9]*$/, message: 'Only numbers are allowed' },
  },
  passportNumber: {
    required: 'Passport Number is required',
    minLength: { value: 9, message: 'Min Length 9' },
    maxLength: { value: 9, message: 'Max Length 9' },
    pattern: {
      value: /^[A-z]{2}[0-9]{7}$/,
      message: 'Value must start with 2 letters followed by 7 digits',
    },
  },
  dateOfBirth: { required: 'Date of Birth is required' },
  country: { required: 'Country is required' },
  street: { required: 'Street is required' },
  appartment: { required: 'Apartment is required' },
  visitCountry: { required: 'Country is required' },
  visitStreet: { required: 'Street is required' },
  visitAppartment: { required: 'Apartment is required' },
}

export const createPatientNavItems = (
  index: number,
  patientId: string,
  isFirstPatient: boolean
) => {
  const items = [
    {
      title: 'Patient Age',
      id: `patients[${index}]-age`,
      url: `#patients[${index}]-age`,
    },
    {
      title: 'Patient Data',
      id: `patients[${index}]-patientData`,
      url: `#patients[${index}]-patientData`,
    },
    {
      title: 'Symptoms',
      id: `patients[${index}]-symptoms`,
      url: `#patients[${index}]-symptoms`,
    },
    {
      title: 'Document',
      id: `patients[${index}]-docType`,
      url: `#patients[${index}]-docType`,
    },
  ]

  if (isFirstPatient) {
    items.push({
      title: 'Address',
      id: `patients[${index}]-address`,
      url: `#patients[${index}]-address`,
    })
  }

  return items
}

export const getDateOfBirthByPesel = (pesel: string) => {
  const yearPrefix = pesel.slice(0, 2)
  const month = pesel.slice(2, 4)
  const day = pesel.slice(4, 6)

  let fullYear = ''

  if (parseInt(month) >= 1 && parseInt(month) <= 12) {
    fullYear = '19' + yearPrefix
  } else if (parseInt(month) >= 21 && parseInt(month) <= 32) {
    fullYear = '20' + yearPrefix
  }

  const dateString = `${fullYear}-${month}-${day}`

  const date = new Date(dateString)
  return date
}
