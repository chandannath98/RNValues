const DateFormater=(date)=>{
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);
return formattedDate
}


export default DateFormater