const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = []

    for (let i = 1 ; i < length; i++) {
        result.push()
    }

    return result
}

const createData = () => { // Code to calculate the start day, days in month, etc.
    const current = new Date()
    current.setDate(1) // Use setDate to set the day of the month

    // Get the day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const startDay = current.getDay() 
    const daysInMonth = getDaysInMonth(current)
    
    // Code to create an array of objects representing the calendar weeks and days
    const weeks = createArray(6)
    const days = createArray(daysInMonth)
    const result = []

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        })

        for (const dayIndex of days ) {
            const day = (dayIndex - startDay) + (weekIndex * 7) + 1
            const isValid = day > 0 && day <= daysInMonth

            result[weekIndex].days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            })
        }
    }

    return result
}

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}

        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `

    return result
}

const createHtml = (data) => {
    let result = ''

    for (const { week, days } of data ) {
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)
    
        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
            const isAlternate = week % 2 === 0;

		    let classString = 'table__cell';
            
            if (isToday) classString = `${classString} table__cell_today`;
            if (isWeekend) classString = `${classString} table__cell_weekend`;
            if (isAlternate) classString = `${classString} table__cell_alternate`;
            
            inner = addCell(inner, classString, value)
        }

        result = `
        ${result}
        <tr>${inner}</tr>
        `
    }
    
    return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)