# ESPN WNBA Fantasy API Documentation

Unofficial documentation for ESPN's WNBA Fantasy Basketball API endpoints. This API uses the game code `wfba` (Women's Fantasy Basketball Association).

⚠️ **Disclaimer:** This is an unofficial, reverse-engineered API. ESPN may change or remove these endpoints without notice. Use responsibly and respect ESPN's Terms of Service.

## 🏀 Base URL
https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/

## 🔓 Public Endpoints (No Authentication Required)

### Get All WNBA Players
```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/players?view=players_wl&scoringPeriodId=0"
Get WNBA Team Schedules
bashcurl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025?view=proTeamSchedules_wl"
Get Game State
bashcurl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025?view=kona_game_state"
🔒 Private League Endpoints (Authentication Required)
Get League Rosters
bashcurl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/segments/0/leagues/{LEAGUE_ID}?view=mRoster&view=mTeam" \
  -H "Cookie: espn_s2=YOUR_ESPN_S2; SWID=YOUR_SWID"
Get League Settings & Info
bashcurl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/segments/0/leagues/{LEAGUE_ID}?view=mSettings" \
  -H "Cookie: espn_s2=YOUR_ESPN_S2; SWID=YOUR_SWID"
📊 Key Data Points

Player ownership percentages across all leagues
Roster information for private leagues
Position eligibility and lineup slots
WNBA team schedules and game state
League settings and rules

🔑 Authentication
See authentication/cookie-setup.md for detailed instructions on obtaining ESPN cookies.
📈 Contributing
Found new endpoints? Contributions welcome! See CONTRIBUTING.md
⚖️ Legal
This project is for educational purposes. All data belongs to ESPN. Use responsibly.