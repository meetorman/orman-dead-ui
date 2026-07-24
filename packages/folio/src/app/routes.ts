// The designed surface. Every show date and venue slug is a real record now
// (the API serves a floor page for anything on file), so designed-ness is a
// pattern, not a list. Unknown records 404 at fetch time → shell + notice.
const SHOW_PATH = /^\/shows\/\d{4}-\d{2}-\d{2}(\/\d+)?$/;
const VENUE_PATH = /^\/venues\/[a-z0-9-]+$/;

export function isDesignedPath(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/venues' ||
    SHOW_PATH.test(pathname) ||
    VENUE_PATH.test(pathname)
  );
}

// Internal-but-undesigned hosts (the old research-repo services). Links into
// these are citations/records that exist in record content — notice, not nav.
export const LAN_INTERNAL_HOSTS = new Set([
  '192.168.2.33:8733',
  '192.168.2.33:8750',
  '127.0.0.1:8733',
  '127.0.0.1:8750',
]);
