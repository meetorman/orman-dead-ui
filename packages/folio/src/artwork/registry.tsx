import type { ReactNode } from 'react';
import { BartonHallAtlas } from './barton-hall-atlas';
import { BartonHallCutaway } from './barton-hall-cutaway';
import { BartonHallPlan } from './barton-hall-plan';
import { BartonHallSchematic } from './barton-hall-schematic';
import { BartonHallShowFloor } from './barton-hall-show-floor';

// The artwork registry: records reference artwork by string key (data); the
// SVG studies themselves are design furniture, like icons. An unknown or
// absent key leaves the slot open — the record still renders.

type MarkerArtworkProps = {
  markers: { id: string; number: string; x: number; y: number; ariaLabel: string }[];
  activeMarkerId: string;
  onMarkerSelect: (id: string) => void;
};

// Annotated plates (VenueSchematic / CutawayPlate renderArtwork slots).
const MARKER_ARTWORK: Record<string, (props: MarkerArtworkProps) => ReactNode> = {
  'barton-hall-hall-model': (props) => <BartonHallSchematic {...props} />,
  'barton-hall-cutaway': (props) => <BartonHallCutaway {...props} />,
};

export function markerArtwork(
  key: string | undefined,
): ((props: MarkerArtworkProps) => ReactNode) | undefined {
  return key ? MARKER_ARTWORK[key] : undefined;
}

// Static slots (story art, plan drawings, show-floor plates).
const STATIC_ARTWORK: Record<string, (opts?: { idPrefix?: string }) => ReactNode> = {
  'barton-hall-cutaway': (opts) => <BartonHallCutaway idPrefix={opts?.idPrefix} />,
  'barton-hall-plan': () => <BartonHallPlan />,
  'barton-hall-show-floor': () => <BartonHallShowFloor />,
};

export function staticArtwork(key: string | undefined, opts?: { idPrefix?: string }): ReactNode {
  return key && STATIC_ARTWORK[key] ? STATIC_ARTWORK[key](opts) : null;
}

// Atlas slots (view-switching maps).
const ATLAS_ARTWORK: Record<string, (activeView: string) => ReactNode> = {
  'barton-hall-atlas': (activeView) => <BartonHallAtlas activeView={activeView} />,
};

export function atlasArtwork(
  key: string | undefined,
): ((activeView: string) => ReactNode) | undefined {
  return key ? ATLAS_ARTWORK[key] : undefined;
}
