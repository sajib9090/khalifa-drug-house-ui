import { useState, useEffect } from "react";

function useGreetings() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      let greetingMessage = "";
      if (hours >= 5 && hours < 12) {
        greetingMessage = "Good Morning";
      } else if (hours >= 12 && hours < 14) {
        greetingMessage = "Good Noon";
      } else if (hours >= 14 && hours < 17) {
        greetingMessage = "Good Afternoon";
      } else if (hours >= 17 && hours < 20) {
        greetingMessage = "Good Evening";
      } else {
        greetingMessage = "Good Night";
      }

      const formattedDateTime = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`;

      setCurrentDateTime(formattedDateTime);
      setGreeting(greetingMessage);
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { currentDateTime, greeting };
}

export default useGreetings;
