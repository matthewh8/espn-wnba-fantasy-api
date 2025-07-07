# ESPN WNBA Fantasy API - Public Endpoints
BASE_URL="https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba"

echo "=== Getting All WNBA Players ==="
curl "${BASE_URL}/seasons/2025/players?view=players_wl&scoringPeriodId=0" | jq '.[0:3]'

echo -e "\n=== Getting WNBA Team Schedules ==="  
curl "${BASE_URL}/seasons/2025?view=proTeamSchedules_wl" | jq 'keys'

echo -e "\n=== Getting Game State ==="
curl "${BASE_URL}/seasons/2025?view=kona_game_state" | jq 'keys'