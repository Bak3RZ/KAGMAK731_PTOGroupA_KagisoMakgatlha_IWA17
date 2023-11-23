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

const getDaysInMonth = (date) => 
new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below 

/** 
 * Define createArray unction that takes a asingle argument 'length'. 
 * create and return an array with a specified length, where each element of the array is its index in the array
 * */  
const createArray = (length) => {
    const array = []; // empty array that will be populateed with the values from the next step.
    for (let i = 0; i < length; i++) {  // initialize array with the values of indices ranging from 0 to length - 1.
        array.push(i); // add the current value of i to the array
    }
    return array; // return populated array
}
 /** 
  * Calender data
  * Monthly calendar view with an array of arrays.
  * Each inner array represents a week. Each week has seven days.
  * Calendar is displayed as an array of weeks, and each week is displayed as an array of days.
  * The calendar view always starts from the first day of the month.
  * */ 

const createData = () => { //Corrected Arrow function operator
    const current = new Date(); //create date object
    current.setDate(1); // 1st day of the month set

    const startDay = current.getDay(); // Get current date
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(5)
    const days = createArray(7)
    const calenderData = [];

    //initiate a for...of loop, which iterates over the elements of the weeks array
    for (const weekIndex of weeks) { // The loop variable weekIndex will take on the values of each element in the weeks array during each iteration.
        calenderData.push({
            week: weekIndex + 1, // for each weekIndex, a new object is created and pushed onto the calenderData array.
            days: []
        })
    // another for...of loop, iterating over the elements of the days
    for (const dayIndex of days) {
        const day = dayIndex - startDay + weekIndex * 7 + 1;    
        /**checks if dayIndex is equal to the startDay
        * If true, it calculates the day value indicating the first day of the week 
        * compared to the subsequent days
        * */
        const isValid = day > 0 && day <= daysInMonth;
        /** checks whether the calculated day value is within the valid range for the current month.
         * ensures that the day is greater than 0 and less than or equal to the total number of days in the month
         */
        calenderData [weekIndex].days.push({
            dayOfWeek: dayIndex + 1,
            value: isValid ? day : '',

            });
        }
    } 

    return calenderData;
};

/** create HTML table and add new cells to existing HTML table
 * @param {*} existing a string of HTML code that represents the current structure of the table. concatenated with a new <td> element (table cell) at the end of the existing table
 * @param {*} classString a string of class names that should be applied to the new table cell.
 * @param {*} value  content of the new table cell. can be any text or HTML code that should be displayed within the cell.
 * @param {*} tableCell variable contains the HTML code for the new table cell. Constructed using a template literal
 */
const addCell = (existing, classString, value) => {
    const tableCell = /* html */ `
        ${existing}

        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `
    return tableCell;
}
/** HTML Structure based on arrow function and for...of loop
 * Function is to take an array of calendar data as input and generate an HTML string that represents a table.
 * calenderData is defined using arrow function takin in one argument.
 * htmlData is initialized as an empty string first and will be used later to build the HTML.
 * inside for...of loop 'inner' variable is declared and used to build HTML string for the current week.
 * addCell function is called with three arguments. Appends a table cell to inner string.
 * There is a nested for...of loop to iterate over each day object in the days array of the current week object.
 * Inside the nested loop, code determines the CSS class for the table cell based on the current day and the current week.
 * addCell is called with three arguments in it. It appends another table cell to the inner string.
 * After the inner loop is completed, the htmlData string is updated by appending a table row containing all the days of the current week.
 * After the outer loop is completed, the function returns the htmlData string, which contains the HTML for the entire calendar table.
 */
const createHtml = (calenderData) => {
    let htmlData = ""; // used to build the the calender

  for (const { week, days } of calenderData) {
        let inner = '' // used to build HTML string
        inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`); // append a table cell to inner string

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 1 || dayOfWeek === 7; // Logical  operator for 1 and 7
            const isAlternate = week % 2 === 0; 
                  
			let classString = 'table__cell'

            // condition the classtring 
            if (isToday) classString = `${classString} table__cell_today`
            if (isWeekend) classString = `${classString} table__cell_weekend`
            if (isAlternate) classString = `${classString} table__cell_alternate`
                       
            inner = addCell(inner, classString, value); //append another table cell to the inner string
        }

        htmlData = ` ${htmlData} <tr>${inner}</tr> `;
    }
    
    return htmlData;
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const calenderData = createData()
document.querySelector('[data-content]').innerHTML = createHtml(calenderData)