const mapping: Record<string, string> = {
  administrators: 'administrator',
  contents: 'content',
  'content-creators': 'content_creator',
  'content-managers': 'content_manager',
  users: 'user',
  watermarks: 'watermark',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
