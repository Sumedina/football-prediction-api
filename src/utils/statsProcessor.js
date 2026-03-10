export function calculateStats(matches) {

  let goalsFor = 0
  let goalsAgainst = 0
  let wins = 0
  let draws = 0
  let losses = 0
  let over25 = 0
  let btts = 0

  matches.forEach(match => {

    const homeGoals = match.score?.fullTime?.home ?? 0
    const awayGoals = match.score?.fullTime?.away ?? 0

    const totalGoals = homeGoals + awayGoals

    goalsFor += homeGoals
    goalsAgainst += awayGoals

    if(homeGoals > awayGoals) wins++
    else if(homeGoals === awayGoals) draws++
    else losses++

    if(totalGoals > 2.5) over25++

    if(homeGoals > 0 && awayGoals > 0) btts++

  })

  const matchesPlayed = matches.length || 1

  return {

    matchesPlayed,

    goalsFor,
    goalsAgainst,

    avgGoalsFor: goalsFor / matchesPlayed,
    avgGoalsAgainst: goalsAgainst / matchesPlayed,

    winRate: wins / matchesPlayed,
    drawRate: draws / matchesPlayed,
    lossRate: losses / matchesPlayed,

    over25Rate: over25 / matchesPlayed,
    bttsRate: btts / matchesPlayed

  }

}