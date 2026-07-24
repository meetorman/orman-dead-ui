import { useEffect } from 'react';
import { useNotice } from './notice';
import { OrmanShell } from './OrmanShell';

// A record URL that matches the designed patterns but has nothing on file
// (or the API said no): shell + notice, same behavior as an undesigned link.
export function RecordMissing() {
  const { show } = useNotice();
  useEffect(() => show(), [show]);
  return <OrmanShell>{null}</OrmanShell>;
}
