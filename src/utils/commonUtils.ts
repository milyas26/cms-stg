export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const rupiahToNumber = (value: any) =>
  typeof value === "number" ? value : parseInt(value?.replace(/\./g, ""));

export const getStartEndDate = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const endMonth = end.toLocaleString("default", { month: "long" });
  const endYear = end.getFullYear();

  return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
};

export const slugify = (string: string) => {
  const randomString = Math.random().toString(36).substring(2, 7);
  return (
    string
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-") +
    "-" +
    randomString
  );
};

export const wordCounter = (text: string) => {
  if (!text) return 0;
  const words = text.trim().split(/\s+/);
  return words.length;
};

export const initializeString = (text: string) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length === 1) {
    return text.charAt(0);
  } else {
    return words[0].charAt(0) + words[words.length - 1].charAt(0);
  }
};

export function formatNumberCounter(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export function dateTimeFormat(date: string) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "short" });
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
