
import { useEffect, useState } from "react";
import "./RelationshipCounter.css";

// Fecha oficial: 10 de noviembre de 2026, 7:00 a. m. Perú
const START_DATE = new Date("2026-11-10T07:00:00-05:00");

// Para contar meses y años según el calendario peruano
const PERU_TIMEZONE = "America/Lima";

function getPeruDateParts(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PERU_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, Number(value)])
  );

  return values;
}

function calculateTimeTogether() {
  const now = new Date();

  if (now < START_DATE) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }

  const current = getPeruDateParts(now);

  let years = current.year - 2026;
  let months = current.month - 11;

  // Meses completos desde el día 10 a las 7:00 a. m.
  if (
    current.day < 10 ||
    (current.day === 10 &&
      (current.hour < 7 ||
        (current.hour === 7 && current.minute < 0)))
  ) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const anniversaryYear = 2026 + years;
  const anniversaryMonth = 11 + months;

  // Date.UTC normaliza automáticamente los meses
  const lastAnniversary = new Date(
    Date.UTC(
      anniversaryYear,
      anniversaryMonth - 1,
      10,
      12, // 7:00 a. m. en Perú = 12:00 UTC
      0
    )
  );

  const remainingMinutes = Math.floor(
    (now.getTime() - lastAnniversary.getTime()) / 60000
  );

  const days = Math.floor(remainingMinutes / 1440);
  const hours = Math.floor((remainingMinutes % 1440) / 60);
  const minutes = remainingMinutes % 60;

  return { years, months, days, hours, minutes };
}

export default function RelationshipCounter() {
  const [time, setTime] = useState(calculateTimeTogether);

  useEffect(() => {
    const update = () => {
      setTime(calculateTimeTogether());
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.years, label: "Años" },
    { value: time.months, label: "Meses" },
    { value: time.days, label: "Días" },
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Minutos" },
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
              animationDelay: `${index * 0.12}s`,
            }}
          >
            <strong
              key={`${item.label}-${item.value}`}
              className="relationship-number"
            >
              {String(item.value).padStart(2, "0")}
            </strong>

            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <span className="relationship-message">
        No sé qué nos espera mañana, pero me ilusiona descubrirlo contigo.
      </span>
    </div>
  );
}
