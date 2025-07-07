import { WNBAFantasyAPI } from '../src/index.js';

async function runTests() {
  console.log('🧪 Running WNBA Fantasy API Tests...\n');
  
  const api = new WNBAFantasyAPI();
  let passed = 0;
  let failed = 0;

  async function test(name, testFn) {
    try {
      console.log(`Testing: ${name}`);
      await testFn();
      console.log('✅ PASSED\n');
      passed++;
    } catch (error) {
      console.log(`❌ FAILED: ${error.message}\n`);
      failed++;
    }
  }

  await test('Get All Players', async () => {
    const players = await api.getAllPlayers();
    if (!Array.isArray(players) || players.length === 0) {
      throw new Error('Should return array of players');
    }
    console.log(`   Found ${players.length} players`);
  });

  await test('Search Players', async () => {
    const results = await api.searchPlayers('Wilson');
    if (!Array.isArray(results)) {
      throw new Error('Should return array of search results');
    }
    console.log(`   Found ${results.length} players matching "Wilson"`);
  });

  await test('Get Free Agents', async () => {
    const freeAgents = await api.getFreeAgents(5);
    if (!Array.isArray(freeAgents)) {
      throw new Error('Should return array of free agents');
    }
    console.log(`   Found ${freeAgents.length} free agents under 5% ownership`);
  });

  await test('Get Game State', async () => {
    const gameState = await api.getGameState();
    if (!gameState || typeof gameState !== 'object') {
      throw new Error('Should return game state object');
    }
    console.log('   Game state retrieved successfully');
  });

  console.log(`\n�� Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
