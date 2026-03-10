export default function buildPrompt(data) {

return `
Actúa como un analista profesional de datos deportivos especializado en fútbol y modelos predictivos avanzados usados en apuestas profesionales.

Analiza el siguiente partido:

Equipo local: ${data.homeTeam}
Equipo visitante: ${data.awayTeam}
Competición: ${data.league}
Fecha del partido: ${data.date}

Datos estadísticos reales obtenidos de los últimos partidos:

Equipo local:
${JSON.stringify(data.homeStats)}

Equipo visitante:
${JSON.stringify(data.awayStats)}

Enfrentamientos directos:
${JSON.stringify(data.h2h)}

Realiza internamente un análisis extremadamente profundo utilizando:

- forma reciente (últimos partidos)
- estadísticas ofensivas y defensivas
- xG y xGA estimados
- tiros a puerta estimados
- posesión estimada
- corners por partido
- tarjetas promedio
- rendimiento local vs visitante
- enfrentamientos directos
- estilo táctico
- importancia del partido
- tendencias recientes

Utiliza razonamiento estadístico avanzado combinando modelos similares a:

- modelo de Poisson para goles
- simulaciones probabilísticas tipo Monte Carlo
- medias ponderadas de rendimiento reciente
- regresión estadística basada en tendencias

Haz todas las simulaciones necesarias para estimar probabilidades realistas.

NO muestres el análisis ni las explicaciones.

Solo muestra los resultados finales en este formato exacto:

RESULTADOS DEL MODELO

Probabilidad de resultado:
Victoria ${data.homeTeam}: XX %
Empate: XX %
Victoria ${data.awayTeam}: XX %

Goles esperados (xG estimado):
${data.homeTeam}: X.XX
${data.awayTeam}: X.XX
Total esperado: X.XX

Ambos equipos marcan:
Sí: XX %
No: XX %

Tarjetas amarillas esperadas:
${data.homeTeam}: X.X
${data.awayTeam}: X.X
Total esperado: X.X

Tiros de esquina esperados:
${data.homeTeam}: X.X
${data.awayTeam}: X.X
Total esperado: X.X

Tiros a puerta esperados:
${data.homeTeam}: X.X
${data.awayTeam}: X.X
Total esperado: X.X

No incluyas explicaciones, texto adicional ni advertencias.
Solo muestra estos resultados finales.
`

}