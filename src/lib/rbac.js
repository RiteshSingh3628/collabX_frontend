export const ROLES = {
  BRAND: 'brand',
  CREATOR: 'influencer',
}

/**
 * Route permission rules. Each entry maps a path prefix to the roles that
 * are allowed to access it. Rules are evaluated top-to-bottom; the first
 * matching prefix wins. Paths with no matching rule are open to all roles.
 */
export const ROUTE_PERMISSIONS = [
  // Brand-only: discovering and viewing creators
  { prefix: '/creator',  roles: [ROLES.BRAND] },
  { prefix: '/discover', roles: [ROLES.BRAND] },

  // Shared routes
  { prefix: '/campaigns', roles: [ROLES.BRAND, ROLES.CREATOR] },
  { prefix: '/messages',  roles: [ROLES.BRAND, ROLES.CREATOR] },
  { prefix: '/alerts',    roles: [ROLES.BRAND, ROLES.CREATOR] },
  { prefix: '/home',      roles: [ROLES.BRAND, ROLES.CREATOR] },
]

/** Landing page for each role after a denied-access redirect */
export const ROLE_HOME = {
  [ROLES.BRAND]: '/home',
  [ROLES.CREATOR]: '/home',
}

/**
 * Returns true if `role` is permitted to visit `pathname`.
 * Paths not covered by ROUTE_PERMISSIONS are allowed to all roles.
 */
export function canAccess(role, pathname) {
  const normalizedRole = role?.toLowerCase()
  const rule = ROUTE_PERMISSIONS.find(({ prefix }) => pathname.startsWith(prefix))
  if (!rule) return true
  return rule.roles.includes(normalizedRole)
}
