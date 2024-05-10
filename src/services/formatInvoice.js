export const  formatInvoice = (timestamp) =>  {
    const date = new Date(timestamp);
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(3, "0"); // Ensures day is always 3 digits, padded with zeros if necessary
    return `${month}-${day}`;
  }