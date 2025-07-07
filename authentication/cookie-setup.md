# ESPN Cookie Authentication Setup

To access private league data, you need ESPN authentication cookies.

## Getting Your Cookies

1. **Login to ESPN Fantasy** in your browser
2. **Open Developer Tools** (F12)
3. **Go to Application tab** → Cookies → espn.com
4. **Copy these values:**
   - `espn_s2` (long string)
   - `SWID` (format: `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}`)

## Using Cookies in Requests

```bash
curl "https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba/seasons/2025/segments/0/leagues/{LEAGUE_ID}?view=mRoster" \
  -H "Cookie: espn_s2=YOUR_ESPN_S2_VALUE; SWID=YOUR_SWID_VALUE"

Security Notes

Keep your cookies private
Cookies expire periodically
Don't commit cookies to version control
Use environment variables in production

bash# Good practice:
export ESPN_S2="your_espn_s2_value"
export ESPN_SWID="your_swid_value"

curl "..." -H "Cookie: espn_s2=$ESPN_S2; SWID=$ESPN_SWID"