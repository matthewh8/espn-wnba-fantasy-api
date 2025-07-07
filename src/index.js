/**
 * ESPN WNBA Fantasy Basketball API Wrapper
 * Unofficial API for accessing ESPN WNBA Fantasy data
 */

export class WNBAFantasyAPI {
  constructor(options = {}) {
    this.baseUrl = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/wfba';
    this.season = options.season || 2025;
    this.espnS2 = options.espnS2 || null;
    this.swid = options.swid || null;
  }

  /**
   * Get headers for authenticated requests
   */
  _getHeaders() {
    const headers = {
      'Accept': 'application/json',
      'User-Agent': 'WNBA-Fantasy-API/1.0.0'
    };
    
    if (this.espnS2 && this.swid) {
      headers['Cookie'] = `espn_s2=${this.espnS2}; SWID=${this.swid}`;
    }
    
    return headers;
  }

  /**
   * Make API request
   */
  async _request(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    try {
      const response = await fetch(url.toString(), {
        headers: this._getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`WNBA Fantasy API Error: ${error.message}`);
    }
  }

  // PUBLIC ENDPOINTS (No Authentication Required)

  /**
   * Get all WNBA players with ownership data
   */
  async getAllPlayers() {
    return this._request(`/seasons/${this.season}/players`, {
      view: 'players_wl',
      scoringPeriodId: 0
    });
  }

  /**
   * Get WNBA team schedules
   */
  async getTeamSchedules() {
    return this._request(`/seasons/${this.season}`, {
      view: 'proTeamSchedules_wl'
    });
  }

  /**
   * Get current game state and scoring period info
   */
  async getGameState() {
    return this._request(`/seasons/${this.season}`, {
      view: 'kona_game_state'
    });
  }

  /**
   * Find players by name
   */
  async searchPlayers(searchTerm) {
    const players = await this.getAllPlayers();
    return players.filter(player => 
      player.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Get players by ownership percentage range
   */
  async getPlayersByOwnership(minOwnership = 0, maxOwnership = 100) {
    const players = await this.getAllPlayers();
    return players.filter(player => 
      player.ownership.percentOwned >= minOwnership && 
      player.ownership.percentOwned <= maxOwnership
    );
  }

  /**
   * Get top available free agents (low ownership)
   */
  async getFreeAgents(maxOwnership = 10) {
    return this.getPlayersByOwnership(0, maxOwnership);
  }

  // PRIVATE ENDPOINTS (Authentication Required)

  /**
   * Get league information and settings
   */
  async getLeague(leagueId) {
    this._requireAuth();
    return this._request(`/seasons/${this.season}/segments/0/leagues/${leagueId}`, {
      view: 'mSettings,mTeam,mRoster'
    });
  }

  /**
   * Get specific manager's team
   */
  async getManagerTeam(leagueId, teamId) {
    this._requireAuth();
    const league = await this.getLeague(leagueId);
    return league.teams.find(team => team.id === teamId);
  }

  /**
   * Get all teams/managers in a league
   */
  async getAllTeams(leagueId) {
    this._requireAuth();
    const league = await this.getLeague(leagueId);
    return league.teams.map(team => ({
      id: team.id,
      name: team.name,
      owner: team.owners?.[0]?.firstName || 'Unknown',
      record: team.record?.overall || {},
      roster: team.roster?.entries || []
    }));
  }

  /**
   * Get league rosters
   */
  async getLeagueRosters(leagueId) {
    this._requireAuth();
    return this._request(`/seasons/${this.season}/segments/0/leagues/${leagueId}`, {
      view: 'mRoster,mTeam'
    });
  }

  /**
   * Get pending transactions (waivers, trades)
   */
  async getPendingTransactions(leagueId) {
    this._requireAuth();
    return this._request(`/seasons/${this.season}/segments/0/leagues/${leagueId}`, {
      view: 'mPendingTransactions'
    });
  }

  /**
   * Get league settings
   */
  async getLeagueSettings(leagueId) {
    this._requireAuth();
    const league = await this._request(`/seasons/${this.season}/segments/0/leagues/${leagueId}`, {
      view: 'mSettings'
    });
    return league.settings;
  }

  // UTILITY METHODS

  /**
   * Check if authentication is configured
   */
  _requireAuth() {
    if (!this.espnS2 || !this.swid) {
      throw new Error('Authentication required. Please provide espnS2 and swid cookies.');
    }
  }

  /**
   * Set authentication cookies
   */
  setAuth(espnS2, swid) {
    this.espnS2 = espnS2;
    this.swid = swid;
  }

  /**
   * Change season
   */
  setSeason(season) {
    this.season = season;
  }
}

// Export for CommonJS compatibility
export default WNBAFantasyAPI;
