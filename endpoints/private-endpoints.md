# ESPN WNBA Fantasy API - Private League Endpoints
# Requires ESPN_S2 and ESPN_SWID environment variables

if [[ -z "$ESPN_S2" || -z "$ESPN_SWID" || -z "$LEAGUE_ID" ]]; then
    echo "Error: Please set environment variables:"
    echo "export ESPN_S2='your_espn_s2_value'"
    echo "export ESPN_SWID='your_swid_value'" 
    echo "export LEAGUE_ID='your_league_id'"
    exit 1
fi

BASE_URL="https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba"
AUTH_HEADER="Cookie: espn_s2=$ESPN_S2; SWID=$ESPN_SWID"

echo "=== Getting League Rosters ==="
curl "${BASE_URL}/seasons/2025/segments/0/leagues/${LEAGUE_ID}?view=mRoster&view=mTeam" \
  -H "$AUTH_HEADER" | jq '.teams[] | {name: .name, rosterCount: (.roster.entries | length)}'

echo -e "\n=== Getting League Settings ==="
curl "${BASE_URL}/seasons/2025/segments/0/leagues/${LEAGUE_ID}?view=mSettings" \
  -H "$AUTH_HEADER" | jq '.settings | keys'

echo -e "\n=== Getting Pending Transactions ==="
curl "${BASE_URL}/seasons/2025/segments/0/leagues/${LEAGUE_ID}?view=mPendingTransactions" \
  -H "$AUTH_HEADER" | jq '.pendingTransactions'