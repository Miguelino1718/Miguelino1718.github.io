import React from 'react';
import data from '../data/valorant.json';
import './ValorantSection.css';

const agentImages = {
  phoenix: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png',
  clove: 'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/fullportrait.png',
};

function PlayerCard({ player }) {
  return (
    <article className="duo-player">
      <div className="duo-agent-art">
        <img src={agentImages[player.agentId]} alt={`Agente ${player.mainAgent}`} loading="lazy" />
      </div>
      <div className="duo-player-body">
        <h3>{player.name}</h3>
        <p className="duo-riot-id">{player.riotId}</p>
        <div className="duo-details">
          <div><span>PEAK RANK</span><strong>{player.peakRank}</strong></div>
          <div><span>MAIN AGENT</span><strong>{player.mainAgent}</strong></div>
        </div>
        <a href={player.trackerUrl} target="_blank" rel="noopener noreferrer" className="duo-tracker">Ver Tracker ↗</a>
      </div>
    </article>
  );
}

export default function ValorantSection() {
  return (
    <section className="valorant-duo" id="nuestro-duo" aria-labelledby="duo-title">
      <div className="duo-heading">
        <p className="duo-kicker">MIGUEL × MARI · VALORANT</p>
        <h2 id="duo-title">Nuestro dúo <span aria-hidden="true">♥</span></h2>
        <p>Diferentes agentes, el mismo equipo.</p>
      </div>
      <div className="duo-grid">
        {data.players.map(player => <PlayerCard key={player.riotId} player={player} />)}
      </div>
      <p className="duo-footer">Mis partidas favoritas siempre son contigo. ♡</p>
    </section>
  );
}
