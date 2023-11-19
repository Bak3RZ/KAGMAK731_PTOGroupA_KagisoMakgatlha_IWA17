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

    for (let i = 0; i < length; i++) {
        result.push(i)
    }

    return result
}

const createData = () => {
    const currentDate = new Date()
    currentDate.setDate(1)

    const startDay = (currentDate.getDay() + 6) % 7;
    const daysInMonth = getDaysInMonth(currentDate)

    const weeks = createArray(5)
    const days = createArray(7)
    const result = []

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        })

        for (const dayIndex of days) {
            const day = (dayIndex === startDay) ? (weekIndex * 7) + 1 : ((dayIndex - startDay + 1))
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
    let isAlternateWeek = false;

    for (const { week, days } of data) {
        let inner = ''
        const weekCellClass = isAlternateWeek ? 'table__cell table__cell_sidebar_alternate' : 'table__cell table__cell_sidebar';
        inner = addCell(inner, weekCellClass, `Week ${week}`)
    
        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend =  dayOfWeek === 0  || dayOfWeek === 6;
            const isAlternate = week % 2 === 1;
            
			let classString = 'table__cell'

            if (isToday) classString = `${classString} table__cell_today`
            if (isWeekend) classString = `${classString} table__cell_weekend`
            if (isAlternate) classString = `${classString} table__cell_alternate`
                       
            inner = `${inner}${addCell('', classString, value)}`;
        }

        result = ` ${result} <tr>${inner}</tr> `

        isAlternateWeek = !isAlternateWeek;
    }
    
    return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)