
import React, { useState } from 'react';

import {
  Heart,
  Music,
  Mail,
  Camera,
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Play,
  Menu,
  X,
  Shuffle,
  Star,
  Video,
  Image as ImageIcon
} from 'lucide-react';

import content from './data/content.json';
import ValorantSection from './components/ValorantSection.jsx';
import RelationshipCounter from "./components/RelationshipCounter.jsx";

/* ==========================================
   FUNCIONES AUXILIARES
========================================== */

const media = (src) =>
  src
    ? src.startsWith('http')
      ? src
      : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
    : '';

const isVideo = (src) =>
  /\.(mp4|webm|ogg)(\?|$)/i.test(src);

/* ==========================================
   COMPONENTE: FOTOGRAFÍA
========================================== */

function Photo({ src, alt, className = '' }) {
  return src ? (
    <img
      className={className}
      src={media(src)}
      alt={alt}
      loading="lazy"
    />
  ) : (
    <div className={`empty-photo ${className}`}>
      <Camera size={32} />
      <span>Tu recuerdo aquí</span>
    </div>
  );
}

/* ==========================================
   COMPONENTE: TÍTULOS DE SECCIÓN
========================================== */

function Heading({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>

      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

/* ==========================================
   COMPONENTE: CONTADOR DE DÍAS
========================================== */

function Counter() {
  if (!content.startDate) {
    return (
      <span className="count-tag">
        <Heart size={15} />
        Una historia que sigue creciendo
      </span>
    );
  }

  const d = Math.max(
    0,
    Math.floor(
      (
        Date.now() -
        new Date(content.startDate + 'T00:00:00').getTime()
      ) / 86400000
    )
  );

  return (
    <span className="count-tag">
      <Heart size={15} />
      {d} días desde nuestra fecha especial
    </span>
  );
}

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

export default function App() {

  /* ESTADOS */

  const [menu, setMenu] = useState(false);
  const [letter, setLetter] = useState(null);
  const [filter, setFilter] = useState('all');
  const [surprise, setSurprise] = useState(null);

  /* NAVEGACIÓN */

  const nav = [
    ['inicio', 'Inicio'],
    ['nosotros', 'Nosotros'],
    ['historia', 'Historia'],
    ['recuerdos', 'Recuerdos'],
    ['cartas', 'Cartas'],
    ['musica', 'Música'],
    ['nuestro-duo', 'Valorant']
  ];

  /* FILTRO DE RECUERDOS */

  const gallery = content.gallery.filter(
    (x) => filter === 'all' || x.type === filter
  );

  /* RECUERDO ALEATORIO */

  const randomMemory = () => {
    const pool = [
      ...content.timeline.map((x) => ({
        title: x.title,
        description: x.description
      })),

      ...content.gallery.map((x) => ({
        title: x.title,
        description: x.caption
      }))
    ];

    setSurprise(
      pool[Math.floor(Math.random() * pool.length)] || {
        title: 'Nuestro rinconcito',
        description:
          'Todavía nos quedan muchos recuerdos por crear.'
      }
    );
  };

  return (
    <>

      {/* ======================================
          BARRA DE NAVEGACIÓN
      ====================================== */}

      <header className="topbar">

        <a className="brand" href="#inicio">
          <Heart size={19} fill="currentColor" />
          M &amp; M
          <span>♡</span>
        </a>

        <nav
          className={menu ? 'nav open' : 'nav'}
          aria-label="Navegación principal"
        >
          {nav.map(([id, t]) => (
            <a
              key={id}
              href={'#' + id}
              onClick={() => setMenu(false)}
            >
              {t}
            </a>
          ))}
        </nav>

        <button
          className="menu-btn"
          aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>

      </header>

      <main>

        {/* ======================================
            01. PORTADA PRINCIPAL
        ====================================== */}

        <section className="hero" id="inicio">

          {/* Imagen de fondo: cubre toda la sección hero */}
          <div className="hero-photo">
              <img
                src={`${import.meta.env.BASE_URL}Banner.png`}
                alt="Miguel y Mari, unidos por la música"
              />
            </div>

          <div className="hero-spark s1">✦</div>
          <div className="hero-spark s2">✧</div>

          <div className="hero-inner">

            <span className="hero-label">
              ✧ UN REGALITO HECHO PARA TI ✧
            </span>
            <h1>
              <span className="hero-title-first">Para mi{"\u00A0\u00A0"}  </span>
              <span className="hero-title-second">
                <em>Marilinda</em>
                <span className="gold-dot">♡</span> 
                </span>
            </h1>


            <p>{content.subtitle}</p>

            <Counter />

            <a href="#nosotros" className="primary-link">
              Explorar nuestra historia
              <ArrowDown size={17} />
            </a>

            <div className="hero-sign">
              Miguel <span>♥</span> Mari
            </div>

          </div>

          <div className="hero-bottom">
            Hecho con cariño, para ti
          </div>

        </section>

        {/* ======================================
            02. NOSOTROS
        ====================================== */}

        <section id="nosotros" className="section cream">

          <div className="wrap">

            <Heading
              eyebrow="01 · TÚ Y YO"
              title="Dos personas, una historia"
              subtitle="Cada uno con su mundo, y un montón de momentos por compartir."
            />

            <div className="people-grid">

              {content.people.map((p, i) => (

                <article className="person" key={p.name}>

                  <div className="person-image">

                    <Photo
                      src={p.image}
                      alt={p.name}
                    />

                    <span className="person-sticker">
                      {i ? '✿' : '✦'}
                    </span>

                  </div>

                  <div className="person-info">

                    <span className="mini-label">
                      {i ? 'LA PRINCESA' : 'EL PRÍNCIPE'}
                    </span>

                    <h3>{p.name}</h3>

                    <strong>{p.tagline}</strong>

                    <p>{p.description}</p>

                  </div>

                </article>

              ))}

            </div>
            
            <RelationshipCounter />

            <div className="dedication">
              <p>{content.dedication}</p>
              <Heart size={22} fill="currentColor" />
            </div>

          </div>

        </section>

        {/* ======================================
            03. NUESTRA HISTORIA
        ====================================== */}

        <section id="historia" className="section white">

          <div className="wrap narrow">

            <Heading
              eyebrow="02 · NUESTRO CAMINO"
              title="Nuestra historia"
              subtitle="Los momentos pequeños también merecen ser recordados."
            />

            <div className="timeline">

              {content.timeline.map((item, i) => (

                <article className="time-item" key={item.id}>

                  <div className="time-marker">
                    {i + 1}
                  </div>

                  <div className="time-card">

                    <span className="mini-label">
                      {item.date || 'UN RECUERDO ESPECIAL'}
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    {item.image && (
                      <Photo
                        src={item.image}
                        alt={item.title}
                        className="timeline-img"
                      />
                    )}

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>

        {/* ======================================
            04. CAJITA DE RECUERDOS
        ====================================== */}

        <section id="recuerdos" className="section cream">

          <div className="wrap">

            <Heading
              eyebrow="03 · NUESTRO ÁLBUM"
              title="Cajita de recuerdos"
              subtitle="Fotos, clips y esas pequeñas cosas que no quiero olvidar."
            />

            {/* FILTROS */}

            <div className="filters">

              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>

              <button
                className={filter === 'photo' ? 'active' : ''}
                onClick={() => setFilter('photo')}
              >
                <ImageIcon size={15} />
                Fotos
              </button>

              <button
                className={filter === 'video' ? 'active' : ''}
                onClick={() => setFilter('video')}
              >
                <Video size={15} />
                Videos
              </button>

            </div>

            {/* GALERÍA */}

            <div className="gallery-grid">

              {gallery.map((g, i) => (

                <article className="memory-card" key={g.id}>

                  <div className="memory-media">

                    {g.src ? (

                      g.type === 'video' && isVideo(g.src) ? (

                        <video
                          controls
                          preload="metadata"
                          src={media(g.src)}
                        />

                      ) : g.type === 'video' ? (

                        <a
                          className="video-link"
                          href={media(g.src)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play />
                          Abrir video
                          <ExternalLink size={14} />
                        </a>

                      ) : (

                        <Photo
                          src={g.src}
                          alt={g.title}
                        />

                      )

                    ) : (

                      <div className="empty-photo">

                        {g.type === 'video'
                          ? <Video size={34} />
                          : <Camera size={34} />
                        }

                        <span>
                          {g.type === 'video'
                            ? 'Tu video aquí'
                            : 'Tu foto aquí'
                          }
                        </span>

                      </div>

                    )}

                  </div>

                  <div className="memory-text">

                    <span className="mini-label">
                      RECUERDO {String(i + 1).padStart(2, '0')}
                    </span>

                    <h3>{g.title}</h3>
                    <p>{g.caption}</p>

                  </div>

                </article>

              ))}

            </div>

            {/* RECUERDO ALEATORIO */}

            <div className="surprise">

              <p>¿Un pequeño viaje al pasado?</p>

              <button
                onClick={randomMemory}
                className="secondary-btn"
              >
                <Shuffle size={16} />
                Recuérdame algo bonito
              </button>

              {surprise && (

                <div className="surprise-result">
                  <strong>{surprise.title}</strong>
                  <p>{surprise.description}</p>
                </div>

              )}

            </div>

          </div>

        </section>

        {/* ======================================
            05. CARTAS PARA MARI
        ====================================== */}

        <section id="cartas" className="section white">

          <div className="wrap">

            <Heading
              eyebrow="04 · PALABRAS PARA TI"
              title="Cartitas para Mari"
              subtitle="Algunas cosas se dicen mejor cuando se escriben con el corazón."
            />

            <div className="letters-grid">

              {content.letters.map((l, i) => (

                <button
                  className="letter-card"
                  key={l.id}
                  onClick={() => setLetter(l)}
                >

                  <div className="envelope">
                    <Mail size={43} strokeWidth={1.3} />
                    <span>♥</span>
                  </div>

                  <span className="mini-label">
                    CARTA {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3>{l.title}</h3>
                  <p>{l.subtitle}</p>

                  <span className="read-letter">
                    Abrir carta ↗
                  </span>

                </button>

              ))}

            </div>

          </div>

        </section>

        {/* ======================================
            06. NUESTRA MÚSICA
        ====================================== */}

        <section id="musica" className="section blush">

          <div className="wrap narrow">

            <Heading
              eyebrow="05 · NUESTRA BANDA SONORA"
              title="Canciones que guardan historias"
              subtitle="Porque algunas melodías siempre me harán pensar en ti."
            />

            <div className="songs">

              {content.songs.map((s, i) => (

                <article className="song" key={s.id}>

                  <div className="song-icon">
                    <Music />
                  </div>

                  <div className="song-body">

                    <span className="mini-label">
                      CANCIÓN {String(i + 1).padStart(2, '0')}
                    </span>

                    <h3>{s.title}</h3>
                    <p>{s.artist}</p>
                    <small>{s.note}</small>

                  </div>

                  {s.url ? (

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={'Escuchar ' + s.title}
                      className="song-play"
                    >
                      <Play size={20} />
                    </a>

                  ) : (

                    <span className="song-play inactive">
                      <Music size={20} />
                    </span>

                  )}

                </article>

              ))}

            </div>

          </div>

        </section>

        {/* ======================================
            07. NUESTRO DÚO EN VALORANT
        ====================================== */}

        <ValorantSection />

        {/* ======================================
            08. NUESTRO FUTURO
        ====================================== */}

        <section className="section white" id="futuro">

          <div className="wrap narrow">

            <Heading
              eyebrow="07 · LO QUE NOS ESPERA"
              title="Historias por escribir"
              subtitle="Una pequeña lista de cosas que me ilusiona seguir viviendo."
            />

            <div className="wish-list">

              {content.wishes.map((w, i) => (

                <div className="wish" key={i}>
                  <Star size={19} />
                  <span>{w}</span>
                  <Heart size={15} />
                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ======================================
            09. DESPEDIDA
        ====================================== */}

        <section className="closing">

          <div className="wrap narrow">

            <span className="closing-spark">
              ✦ ♡ ✦
            </span>

            <h2>
              Y esto es solo
              <br />
              <em>el comienzo.</em>
            </h2>

            <p>{content.footerMessage}</p>

            <span className="closing-sign">
              Con cariño, Miguel 💛
            </span>

            <a href="#inicio" className="back-top">
              Volver al inicio
              <ArrowUp size={16} />
            </a>

          </div>

        </section>

      </main>

      {/* ======================================
          PIE DE PÁGINA
      ====================================== */}

      <footer className="footer">
        Para mi Marilinda 💛 · hecho con mucho cariño ♡
      </footer>

      {/* ======================================
          VENTANA EMERGENTE DE CARTAS
      ====================================== */}

      {letter && (

        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setLetter(null);
            }
          }}
        >

          <div
            className="letter-modal"
            role="dialog"
            aria-modal="true"
            aria-label={letter.title}
          >

            <button
              className="modal-close"
              aria-label="Cerrar carta"
              onClick={() => setLetter(null)}
            >
              <X />
            </button>

            <div className="letter-top">
              ✦ UNA CARTITA PARA TI ✦
            </div>

            <h2>{letter.title}</h2>

            <p className="letter-body">
              {letter.body}
            </p>

            <div className="letter-sign">
              Con cariño ♡
            </div>

          </div>

        </div>

      )}

    </>
  );
}
