# ESPN WNBA Fantasy API Documentation

Unofficial documentation for ESPN's WNBA Fantasy Basketball API endpoints. This API uses the game code `wfba` (Women's Fantasy Basketball Association).

⚠️ **Disclaimer:** This is an unofficial, reverse-engineered API. ESPN may change or remove these endpoints without notice. Use responsibly and respect ESPN's Terms of Service.

## 📦 Installation

```bash
npm install wnba-fantasy-api
```

## 🚀 Quick Start
```bash
javascriptimport { WNBAFantasyAPI } from 'wnba-fantasy-api';

// Initialize API
const api = new WNBAFantasyAPI();

// Get all players
const players = await api.getAllPlayers();

// Search for players
const searchResults = await api.searchPlayers('Wilson');

// Get free agents (low ownership)
const freeAgents = await api.getFreeAgents(10); // Under 10% owned

// For private league data, provide authentication
const authenticatedApi = new WNBAFantasyAPI({
  espnS2: 'your_espn_s2_cookie',
  swid: 'your_swid_cookie'
});

// Get manager's team
const team = await authenticatedApi.getManagerTeam(leagueId, teamId);

// Get all teams in league
const allTeams = await authenticatedApi.getAllTeams(leagueId);
```

## 🏀 Base URL
https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/

## 🔓 Public Endpoints (No Authentication Required)

### Get All WNBA Players
```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/players?view=players_wl&scoringPeriodId=0"
```
### Get WNBA Team Schedules
```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025?view=proTeamSchedules_wl"
```
### Get Game State
```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025?view=kona_game_state"
```
## 🔒 Private League Endpoints (Authentication Required)

### Get League Rosters
```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/segments/0/leagues/{LEAGUE_ID}?view=mRoster&view=mTeam" \
  -H "Cookie: espn_s2=YOUR_ESPN_S2; SWID=YOUR_SWID"
```
### Get League Settings & Info
```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/segments/0/leagues/{LEAGUE_ID}?view=mSettings" \
  -H "Cookie: espn_s2=YOUR_ESPN_S2; SWID=YOUR_SWID"
```
## 📊 Key Data Points

- Player ownership percentages across all leagues
- Roster information for private leagues
- Position eligibility and lineup slots
- WNBA team schedules and game state
- League settings and rules

## 🔑 Authentication
See authentication/cookie-setup.md for detailed instructions on obtaining ESPN cookies.

## 📈 Contributing
Found new endpoints? Contributions welcome! See CONTRIBUTING.md

## ⚖️ Legal
This project is for educational purposes. All data belongs to ESPN. Use responsibly.