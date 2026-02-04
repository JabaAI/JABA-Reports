/**
 * Reports Configuration
 *
 * Controls which reports are available based on environment variables.
 * Set VITE_AVAILABLE_REPORTS to a comma-separated list of report/school IDs.
 */

export type ReportId = 'playfly-dashboard' | 'ip-report' | 'brand-partnerships';
export type SchoolId = 'playfly' | 'auburn' | 'kentucky';

export interface ReportConfig {
  id: ReportId;
  name: string;
  description: string;
  enabled: boolean;
}

/**
 * Get the list of enabled IDs from environment variables
 */
function getEnabledIds(): string[] | null {
  const envReports = import.meta.env.VITE_AVAILABLE_REPORTS;

  // If not set or empty, return null (show all)
  if (!envReports || envReports.trim() === '') {
    return null;
  }

  // Parse comma-separated list
  return envReports
    .split(',')
    .map((r: string) => r.trim())
    .filter((r: string) => r.length > 0);
}

/**
 * Get the list of enabled report IDs from environment variables
 */
function getEnabledReportIds(): ReportId[] | null {
  return getEnabledIds() as ReportId[] | null;
}

/**
 * Check if a specific report is enabled
 */
export function isReportEnabled(reportId: ReportId): boolean {
  const enabledReports = getEnabledReportIds();

  // If null (not configured), all reports are enabled
  if (enabledReports === null) {
    return true;
  }

  // Check if this specific report is in the enabled list
  return enabledReports.includes(reportId);
}

/**
 * Check if a specific school is enabled
 */
export function isSchoolEnabled(schoolId: string): boolean {
  const enabledIds = getEnabledIds();

  // If null (not configured), all schools are enabled
  if (enabledIds === null) {
    return true;
  }

  // Check if this specific school is in the enabled list
  return enabledIds.includes(schoolId);
}

/**
 * Get all available report configurations
 */
export function getAvailableReports(): ReportConfig[] {
  const allReports: Omit<ReportConfig, 'enabled'>[] = [
    {
      id: 'playfly-dashboard',
      name: 'Playfly Dashboard',
      description: 'Real-time campaign management and athlete oversight'
    },
    {
      id: 'ip-report',
      name: 'IP Impact Report',
      description: 'How intellectual property signals drive engagement'
    },
    {
      id: 'brand-partnerships',
      name: 'Brand Partnerships',
      description: 'Analyze brand performance and partnership gaps'
    }
  ];

  return allReports.map(report => ({
    ...report,
    enabled: isReportEnabled(report.id)
  }));
}

/**
 * Get only enabled reports
 */
export function getEnabledReports(): ReportConfig[] {
  return getAvailableReports().filter(report => report.enabled);
}
