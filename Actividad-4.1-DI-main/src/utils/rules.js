export const calcularNuevoMarcador = (puntajeActual, puntosASumar) => {
  return puntajeActual + puntosASumar;
};

export const obtenerGanador = (homeScore, awayScore, homeTeam, awayTeam) => {
  if (homeScore > awayScore) {
    return { ganador: homeTeam, puntos: homeScore, empate: false };
  } else if (awayScore > homeScore) {
    return { ganador: awayTeam, puntos: awayScore, empate: false };
  }
  return { empate: true, puntos: homeScore };
};

export const obtenerTop5Anotadores = (estadisticas) => {
  const todosLosJugadores = [
    ...estadisticas.home.map(j => ({ ...j, equipo: 'home' })),
    ...estadisticas.away.map(j => ({ ...j, equipo: 'away' }))
  ];

  return todosLosJugadores
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 5);
};