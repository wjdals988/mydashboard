/** @typedef {import('./projects').Project} Project */
/** @typedef {'web' | 'android'} ProjectPlatform */

/** Platform describes the project, not whether an install file is published.
 * @param {Project} project
 * @returns {ProjectPlatform[]}
 */
export function platformsOf(project) {
  const platforms = [];
  if (project.liveUrl) platforms.push("web");
  if (
    project.apk ||
    project.tags.includes("Android") ||
    project.tags.includes("Kotlin")
  )
    platforms.push("android");
  return /** @type {ProjectPlatform[]} */ (platforms);
}

/**
 * @param {Project[]} projects
 * @param {{query: string, status: 'all' | import('./projects').ProjectStatus, platform: 'all' | ProjectPlatform, downloadOnly: boolean, sort: string}} filters
 * @returns {Project[]}
 */
export function filterProjects(projects, filters) {
  const terms = filters.query
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const result = projects.filter((project) => {
    const text = [
      project.title,
      project.eyebrow,
      project.summary,
      ...project.tags,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      terms.every((term) => text.includes(term)) &&
      (filters.status === "all" || project.status === filters.status) &&
      (filters.platform === "all" ||
        platformsOf(project).includes(filters.platform)) &&
      (!filters.downloadOnly || Boolean(project.apk))
    );
  });
  return filters.sort === "updated"
    ? result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    : result;
}
