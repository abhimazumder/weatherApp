export const getDayWithSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const getDay = (isoDateTimeString) => {
  const date = new Date(isoDateTimeString);

  const dayWithSuffix = getDayWithSuffix(date.getDate());
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );

  return `${dayWithSuffix} ${month}`;
};

export const getTime = (isoString) => {
  const date = new Date(isoString);

  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return formattedTime;
};

export const compareDates = (dateString, dateStringCurrent) => {
  const date = new Date(dateString);
  const dateCurrent = new Date(dateStringCurrent);

  if (date.toDateString() === dateCurrent.toDateString()) {
    return "Today";
  }

  const yesterday = new Date(dateCurrent);
  yesterday.setDate(dateCurrent.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  const tomorrow = new Date(dateCurrent);
  tomorrow.setDate(dateCurrent.getDate() + 1);

  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[date.getDay()];

  return dayName;
};



export const getLabel = (string) => {
    const words = string?.split("_");
    const capitalisedWords = words.map(word => word[0]?.toUpperCase() + word?.slice(1))?.splice(0, 2);
    return capitalisedWords?.join(" ");
}