import {
    isTimeOptionsEmpty,
    toMS,
    timeOptionsToMS,
    toTimeOptions,
    getEndSecond,
    getRemainingMS,
    getEndMinute,
    getEndHour,
    getEndDay,
    getEndWeek,
    getEndMonth,
    getRemainingSecond,
    getRemainingMinute,
    getRemainingHour,
    getRemainingDay,
    toLocalDate,
    toLocalMS,
} from './index'

test('toMS', () => {
    expect(toMS('millisecond', 1)).toBe(1)
    expect(toMS('second', 1)).toBe(1000)
    expect(toMS('minute', 1)).toBe(60000)
    expect(toMS('hour', 1)).toBe(3600000)
    expect(toMS('day', 1)).toBe(86400000)
})

test('timeOptionsToMS', () => {
    expect(
        timeOptionsToMS({
            millisecond: 1,
            second: 1,
            minute: 1,
            hour: 1,
            day: 1,
        })
    ).toBe(90061001)
})

test('isTimeOptionsEmpty', () => {
    expect(isTimeOptionsEmpty({})).toBe(true)

    expect(
        isTimeOptionsEmpty({
            millisecond: 1,
        })
    ).toBe(false)
})

test('toTimeOptions', () => {
    expect(toTimeOptions(90061001)).toStrictEqual({
        millisecond: 1,
        second: 1,
        minute: 1,
        hour: 1,
        day: 1,
    })

    expect(toTimeOptions(0)).toStrictEqual({
        millisecond: 0,
        second: 0,
        minute: 0,
        hour: 0,
        day: 0,
    })
})

describe.each([
    new Date(86400000)
])('get end of the time ', (date) => {
    test('getEndSecond', () => {
        const end = getEndSecond(date)
        expect(end.getTime()).toBe(86400999)
    })

    test('getEndMinute', () => {
        const end = getEndMinute(date)
        expect(end.getTime()).toBe(86459999)
    })

    test('getEndHour', () => {
        const end = getEndHour(date)
        expect(end.getTime()).toBe(89999999)
    })

    test('getEndDay', () => {
        const end = getEndDay(date)
        expect(end.getTime()).toBe(172799999)
    })

    test('getEndWeek', () => {
        const end = getEndWeek(date)
        expect(end.getTime()).toBe(345599999)
    })

    test('getEndMonth', () => {
        const end = getEndMonth(date)
        expect(end.getTime()).toBe(2678399999)
    })
})

describe.each([
    new Date(86400000)
])('get the remaining time', (date) => {
    test('getRemainingMS', () => {
        expect(getRemainingMS(date)).toBe(999)
    })

    test('getRemainingSecond', () => {
        expect(getRemainingSecond(date)).toBe(59999)
    })

    test('getRemainingMinute', () => {
        expect(getRemainingMinute(date)).toBe(3599999)
    })

    test('getRemainingHour', () => {
        expect(getRemainingHour(date)).toBe(86399999)
    })

    test('getRemainingDay', () => {
        expect(getRemainingDay(date)).toBe(259199999)
    })
})

describe.each([
    new Date(86400000)
])('get the local date', (date) => {
    test('getEndSecond', () => {
        const newDate = toLocalDate(getEndSecond(date), -480)
        expect(newDate.getTime()).toBe(57600999)
    })

    test('getEndMinute', () => {
        const newDate = toLocalDate(getEndMinute(date), -480)
        expect(newDate.getTime()).toBe(57659999)
    })

    test('getEndHour', () => {
        const newDate = toLocalDate(getEndHour(date), -480)
        expect(newDate.getTime()).toBe(61199999)
    })

    test('getEndDay', () => {
        const newDate = toLocalDate(getEndDay(date), -480)
        expect(newDate.getTime()).toBe(143999999)
    })

    test('getEndWeek', () => {
        const newDate = toLocalDate(getEndWeek(date), -480)
        expect(newDate.getTime()).toBe(316799999)
    })

    test('getEndMonth', () => {
        const newDate = toLocalDate(getEndMonth(date), -480)
        expect(newDate.getTime()).toBe(2649599999)
    })
})

describe.each([
    new Date(86400000)
])('get the local time', (date) => {
    test('getRemainingMS', () => {
        const ms = toLocalMS(getRemainingMS(date), -480)
        expect(ms).toEqual(999)
    })

    test('getRemainingSecond', () => {
        const ms = toLocalMS(getRemainingSecond(date), -480)
        expect(ms).toEqual(59999)
    })

    test('getRemainingMinute', () => {
        const ms = toLocalMS(getRemainingMinute(date), -480)
        expect(ms).toEqual(3599999)
    })

    test('getRemainingHour', () => {
        const ms = toLocalMS(getRemainingHour(date), -480)
        expect(ms).toEqual(57599999)
    })

    test('getRemainingDay', () => {
        const ms = toLocalMS(getRemainingDay(date), -480)
        expect(ms).toEqual(230399999)
    })
})