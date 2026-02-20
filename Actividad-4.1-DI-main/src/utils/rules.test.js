import { calcularNuevoMarcador, obtenerGanador, obtenerTop5Anotadores } from './rules';

test('debe sumar 2 puntos correctamente al marcador', () => {
  const resultado = calcularNuevoMarcador(10, 2);
  expect(resultado).toBe(12);
});

test('debe sumar 3 puntos correctamente al marcador', () => {
  const resultado = calcularNuevoMarcador(10, 3);
  expect(resultado).toBe(13);
});

test('debe determinar el ganador correctamente', () => {
  const homeTeam = { name: 'Bulls' };
  const awayTeam = { name: 'Lakers' };
  
  const resultado = obtenerGanador(100, 95, homeTeam, awayTeam);
  
  expect(resultado.ganador.name).toBe('Bulls');
  expect(resultado.puntos).toBe(100);
  expect(resultado.empate).toBe(false);
});

test('debe detectar un empate', () => {
  const homeTeam = { name: 'Bulls' };
  const awayTeam = { name: 'Lakers' };
  
  const resultado = obtenerGanador(100, 100, homeTeam, awayTeam);
  
  expect(resultado.empate).toBe(true);
  expect(resultado.puntos).toBe(100);
});

test('debe ordenar y filtrar el top 5 anotadores', () => {
  const estadisticas = {
    home: [
      { name: 'Jordan', puntos: 30 },
      { name: 'Pippen', puntos: 20 }
    ],
    away: [
      { name: 'Magic', puntos: 25 },
      { name: 'Worthy', puntos: 18 },
      { name: 'Kareem', puntos: 22 },
      { name: 'Scott', puntos: 10 }
    ]
  };
  
  const top5 = obtenerTop5Anotadores(estadisticas);
  
  expect(top5.length).toBe(5);
  expect(top5[0].name).toBe('Jordan');
  expect(top5[0].puntos).toBe(30);
  expect(top5[4].name).toBe('Worthy');
});