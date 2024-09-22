import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";


export const convertDateToString = (date: Timestamp) => {
  let formattedDate = "Unknown date";
  try {
    formattedDate = format(date.toDate(), "MMMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date: ", error);
  }

  return formattedDate;
}