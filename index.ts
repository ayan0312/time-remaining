export type TimeTypes = 'millisecond' | 'second' | 'minute' | 'hour' | 'day'

export type FullTimeOptions = Record<TimeTypes, number>
export type TimeOptions = Partial<FullTimeOptions>

export const MILLISECOND = 1
export const SECOND = 1000 * MILLISECOND
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export function toLocalDate(date: Date, offsetMinute?: number): Date {
    if (!offsetMinute) offsetMinute = new Date().getTimezoneOffset()
    const offsetMS = offsetMinute * MINUTE
    const newDate = new Date(date)
    newDate.setTime(newDate.getTime() + offsetMS)
    return newDate
}

export function toLocalMS(ms: number, offsetMinute?: number): number {
    if (!offsetMinute) offsetMinute = new Date().getTimezoneOffset()
    const offsetMS = offsetMinute * MINUTE
    const result = ms + offsetMS
    return result < 0 ? 0 : result
}

export function getEndSecond(date: Date): Date {
    let newDate = new Date(date)
    newDate.setUTCMilliseconds(999)
    return newDate
}

export function getEndMinute(date: Date): Date {
    let newDate = getEndSecond(date)
    newDate.setUTCSeconds(59)
    return newDate
}

export function getEndHour(date: Date): Date {
    let newDate = getEndMinute(date)
    newDate.setUTCMinutes(59)
    return newDate
}

export function getEndDay(date: Date): Date {
    let newDate = getEndHour(date)
    newDate.setUTCHours(23)
    return newDate
}

export function getEndWeek(date: Date): Date {
    let newDate = getEndDay(date)
    let today = newDate.getUTCDay()
    if (today !== 0) newDate.setTime((7 - today) * DAY + newDate.getTime())
    return newDate
}

export function getEndMonth(date: Date): Date {
    let newDate = getEndDay(date)
    let month = newDate.getUTCMonth()
    if (month === 11) month = 0
    else month = month + 1
    newDate.setUTCMonth(month)
    newDate.setUTCDate(0)
    return newDate
}

export function getRemainingMS(date: Date): number {
    return getEndSecond(date).getTime() - date.getTime()
}

export function getRemainingSecond(date: Date): number {
    return getEndMinute(date).getTime() - date.getTime()
}

export function getRemainingMinute(date: Date): number {
    return getEndHour(date).getTime() - date.getTime()
}

export function getRemainingHour(date: Date): number {
    return getEndDay(date).getTime() - date.getTime()
}

export function getRemainingDay(date: Date): number {
    return getEndWeek(date).getTime() - date.getTime()
}

export function toTimeOptions(ms: number): TimeOptions {
    let dayRemainder = ms % DAY
    let day = Math.floor(ms / DAY)

    let hourRemainder = dayRemainder % HOUR
    let hour = Math.floor(dayRemainder / HOUR)

    let minuteRemainder = hourRemainder % MINUTE
    let minute = Math.floor(hourRemainder / MINUTE)

    let millisecond = minuteRemainder % SECOND
    let second = Math.floor(minuteRemainder / SECOND)

    return { day, hour, minute, second, millisecond }
}

export function isTimeOptionsEmpty(options: TimeOptions): boolean {
    let n = 0
    Object.keys(options).forEach((key: TimeTypes) => {
        if (options[key]) n += 1
    })
    if (n === 0) return true
    return false
}

export function timeOptionsToMS(options: TimeOptions): number {
    let milliSecond = 0
    Object.keys(options).forEach((timeName: TimeTypes) => {
        let n = options[timeName]
        if (n > 0) milliSecond = milliSecond + toMS(timeName, n)
    })
    return milliSecond
}

export function toMS(timeName: TimeTypes, n: number): number {
    let millisecond = 0
    switch (timeName) {
        case 'millisecond':
            millisecond = n * MILLISECOND
            break
        case 'second':
            millisecond = n * SECOND
            break
        case 'minute':
            millisecond = n * MINUTE
            break
        case 'hour':
            millisecond = n * HOUR
            break
        case 'day':
            millisecond = n * DAY
            break
    }
    return millisecond
}
