import { WNBAFantasyAPI } from '../src/index.js';

async function examples() {
  // Initialize API (no auth needed for public data)
  const api = new WNBAFantasyAPI();

  try {
    console.log('=== Getting All Players ===');
    const players = await api.getAllPlayers();
    console.log(`Found ${players.length} WNBA players`);
    
    console.log('\n=== Top 5 Most Owned Players ===');
    const topOwned = players
      .sort((a, b) => b.ownership.percentOwned - a.ownership.percentOwned)
      .slice(0, 5);
    
    topOwned.forEach(player => {
      console.log(`${player.fullName}: ${player.ownership.percentOwned.toFixed(1)}% owned`);
    });

    console.log('\n=== Finding Free Agents (< 5% owned) ===');
    const freeAgents = await api.getFreeAgents(5);
    console.log(`Found ${freeAgents.length} potential free agents`);
    
    freeAgents.slice(0, 5).forEach(player => {
      console.log(`${player.fullName}: ${player.ownership.percentOwned.toFixed(1)}% owned`);
    });

    console.log('\n=== Searching for Players ===');
    const searchResults = await api.searchPlayers('Wilson');
    searchResults.forEach(player => {
      console.log(`${player.fullName} - ${player.ownership.percentOwned.toFixed(1)}% owned`);
    });

    // For private league data (requires authentication)
    console.log('\n=== Private League Example (requires auth) ===');
    console.log('To use private endpoints, initialize with:');
    console.log('const api = new WNBAFantasyAPI({');
    console.log('  espnS2: "your_espn_s2_cookie",');
    console.log('  swid: "your_swid_cookie"');
    console.log('});');
    console.log('');
    console.log('Then you can use:');
    console.log('await api.getManagerTeam(leagueId, teamId);');
    console.log('await api.getAllTeams(leagueId);');
    console.log('await api.getPendingTransactions(leagueId);');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

examples();
