
import { useEffect, useState } from "react";
import "./RelationshipCounter.css";

const START_DATE = new Date(2026, 10, 10);

function calculateTimeTogether() {
  const today = new Date();

  let years = today.getFullYear() - START_DATE.getFullYear();
  let months = today.getMonth() - START_DATE.getMonth();
  let days = today.getDate() - START_DATE.getDate();

  if (days < 0) {
    months--;

    const previousMonthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    days += previousMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
  };
}

export default function RelationshipCounter() {
  const [time, setTime] = useState(calculateTimeTogether);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeTogether());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relationship-counter">
      <span className="relationship-label">
        ✧ DESDE EL 10 DE NOVIEMBRE DE 2026 ✧
      </span>

      <h3>Nuestro tiempo juntitos ♡</h3>

      <p>
        Cada segundo contigo es un recuerdo
        que quiero guardar.
      </p>

      <div className="relationship-time">
        {[
          { value: time.years, label: "Años" },
          { value: time.months, label: "Meses" },
          { value: time.days, label: "Días" },
        ].map((item, index) => (
          <div
            className="relationship-unit"
            key={item.label}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <strong>
              {String(item.value).padStart(2, "0")}
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <span className="relationship-message">
        Y todavía nos quedan muchísimas historias
        por vivir juntos. 💛
      </span>
    </div>
  );
}
