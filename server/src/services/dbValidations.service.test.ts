import { describe, expect, it } from '@jest/globals'
import {
  calculateDurationInMinutes,
  isStartTimeGreaterThanEndTime,
  timeInPieces
} from './dbValidations.services'

describe('timeInPieces', () => {
  it('debe separar una hora en dos partes, test 1', () => {
    const time = timeInPieces('10:30', '11:45')
    expect(time.startHour).toBe(10)
    expect(time.startMinute).toBe(30)
    expect(time.endHour).toBe(11)
    expect(time.endMinute).toBe(45)
  })

  it('debe separar una hora en dos partes, test 2', () => {
    const time = timeInPieces('01:14', '06:00')
    expect(time.startHour).toBe(1)
    expect(time.startMinute).toBe(14)
    expect(time.endHour).toBe(6)
    expect(time.endMinute).toBe(0)
  })
})

describe('isStartTimeGreaterThanEndTime', () => {
  it('debe devolver true si la hora de inicio es mayor que la hora de fin', () => {
    const result = isStartTimeGreaterThanEndTime('10:30', '09:45')
    expect(result).toBe(true)
  })

  it('debe devolver false si la hora de inicio es menor que la hora de fin', () => {
    const result = isStartTimeGreaterThanEndTime('09:45', '10:30')
    expect(result).toBe(false)
  })

  it('debe devolver true si la hora de inicio es igual que la hora de fin', () => {
    const result = isStartTimeGreaterThanEndTime('10:30', '10:30')
    expect(result).toBe(true)
  })
})

describe('calculateDurationInMinutes', () => {
  it('debe devolver la duración en minutos entre dos horas dadas, test 1', () => {
    const result = calculateDurationInMinutes('10:30', '11:45')
    expect(result).toBe(75)
  })

  it('debe devolver la duración en minutos entre dos horas dadas, test 2', () => {
    const result = calculateDurationInMinutes('01:14', '06:00')
    expect(result).toBe(286)
  })

  it('debe devolver la duración en minutos entre dos horas dadas, test 3', () => {
    const result = calculateDurationInMinutes('20:00', '20:07')
    expect(result).toBe(7)
  })
})
