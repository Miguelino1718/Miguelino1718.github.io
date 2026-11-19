
import { useEffect, useState } from "react";
import "./RelationshipCounter.css";

// Fecha oficial de nuestra relación
// Año, mes (0-11), día, hora, minuto
const START_DATE = new Date(2026, 10, 10, 0, 0);

function calculateTimeTogether() {
  const now = new Date();

  if (now < START_DATE) {
    return { years: 0, months: 0, days: 0, hours: 0 };
  }

  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();

  // Calcular años y meses completos
  let anniversary = new Date(
    START_DATE.getFullYear() + years,
    START_DATE.getMonth() + months,
    START_DATE.getDate(),
    START_DATE.getHours(),
    START_DATE.getMinutes()
  );

  while (anniversary > now) {
    months--;

    if (months < 0) {
      years--;
      months += 12;
    }

    anniversary = new Date(
      START_DATE.getFullYear() + years,
      START_DATE.getMonth() + months,
      START_DATE.getDate(),
      START_DATE.getHours(),
      START_DATE.getMinutes()
    );
  }

  // Días y horas desde el último mes completo
  let days = 0;
  let cursor = new Date(anniversary);

  while (true) {
    const next = new Date(cursor);
    next.setDate(next.getDate() + 1);

    if (next > now) break;

    cursor = next;
    days++;
  }

  const hours = Math.floor(
    (now.getTime() - cursor.getTime()) / 3600000
  );

  return { years, months, days, hours };
}

export default function RelationshipCounter() {
  const [time, setTime] = useState(calculateTimeTogether);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeTogether());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.years, label: "Años" },
    { value: time.months, label: "Meses" },
    { value: time.days, label: "Días" },
    { value: time.hours, label: "Horas" },
  ];

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
        {units.map((item, index) => (
          <div
            className="relationship-unit"
            key={item.label}
            style={{
              animationDelay: `${index * 0.15}s`,
            }}
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
