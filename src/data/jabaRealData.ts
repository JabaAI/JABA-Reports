/**
 * JABA Real Data Loader
 *
 * Loads real data from JABA's PlayFly datasets
 * Now using actual 481 team records from 36 schools
 */

import type { JABARosterTeam, JABAPost } from '../services/jabaDataLoader';

// Import real data directly (Vite handles JSON imports)
import realTeamsData from './PlayFlyFull_roster_teams.json';

/**
 * Load real JABA roster teams data
 * Returns all 481 teams from 36 schools
 */
export function getJABARosterTeams(): JABARosterTeam[] {
  return realTeamsData as JABARosterTeam[];
}

/**
 * Load real JABA posts data
 * In production, this would fetch from PlayflyFull_team_contents.json
 */
export function getJABAPosts(): JABAPost[] {
  // For now, return empty array until we need posts data
  // The file is 6.5MB so we'll only load it when needed
  return [];
}

/**
 * Get teams by school name
 */
export function getTeamsBySchool(schoolName: string): JABARosterTeam[] {
  const teams = getJABARosterTeams();
  return teams.filter(team => team.schoolName === schoolName);
}

/**
 * Get all unique school names
 */
export function getAllSchools(): string[] {
  const teams = getJABARosterTeams();
  const schoolNames = [...new Set(teams.map(team => team.schoolName))];
  return schoolNames.sort();
}

/**
 * Get teams by conference
 */
export function getTeamsByConference(conference: string): JABARosterTeam[] {
  const teams = getJABARosterTeams();
  return teams.filter(team => team.conferenceName === conference);
}

/**
 * Get network statistics
 */
export function getNetworkStats() {
  const teams = getJABARosterTeams();
  const schools = getAllSchools();

  return {
    totalTeams: teams.length,
    totalSchools: schools.length,
    totalFollowers: teams.reduce((sum, t) => sum + t.metrics.ninetyDays.followers, 0),
    avgEngagement: teams.reduce((sum, t) => sum + t.metrics.ninetyDays.engagementRate, 0) / teams.length,
    totalSponsoredContent: teams.reduce((sum, t) => sum + t.metrics.ninetyDays.sponsoredContentCount, 0),
    totalContent: teams.reduce((sum, t) => sum + t.metrics.ninetyDays.contentCount, 0),
  };
}
