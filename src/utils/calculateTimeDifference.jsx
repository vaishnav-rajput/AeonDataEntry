import React from "react";

const calculateTimeDifference = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate the time difference in milliseconds
    let timeDiff = Math.abs(end - start);

    // Convert time difference from milliseconds to hours and minutes
    let hours = Math.floor(timeDiff / 3600000);
    let minutes = Math.floor((timeDiff % 3600000) / 60000);

    // If the time difference is more than 6 hours, return 0
    if (hours > 6) {
        return { hours: 0, minutes: 0 };
    }

    return { hours, minutes };
};

export default calculateTimeDifference