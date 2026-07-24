import { anchor } from '../lib/settle';
import type { StateDef } from '../lib/targets';

export const states: StateDef[] = [
  {
    name: 'hero',
    run: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
    },
  },
  {
    name: 'finder',
    run: async (page) => {
      await anchor(page, '.venue-finder');
    },
  },
  {
    name: 'finder-type-arenas',
    run: async (page) => {
      await page.click('[data-venue-filter="arena"]');
      await anchor(page, '.venue-directory');
    },
  },
  {
    name: 'finder-empty',
    run: async (page) => {
      await page.fill('#venue-search', 'zzzz');
      await anchor(page, '.venue-directory');
    },
  },
  {
    name: 'directory-a-f',
    run: async (page) => {
      await anchor(page, '#letter-a');
    },
  },
  {
    name: 'directory-m-w',
    run: async (page) => {
      await anchor(page, '#letter-m');
    },
  },
  {
    name: 'row-hover',
    run: async (page) => {
      await anchor(page, '#letter-a');
      await page.hover('#letter-a .venue-list > a');
    },
  },
  {
    name: 'footer',
    run: async (page) => {
      await anchor(page, '.site-footer');
    },
  },
];
