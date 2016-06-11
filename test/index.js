import { describe, it } from 'mocha';
import assert from 'assert';
import { graphql } from 'graphql';

import fs from 'fs';

import { BabyNamesSchema } from '../lib/schema'
import kanyeResults from './kanye_m.json'

describe('Baby Names Schema', () => {
  it('Finds 11 results for Kanye M', async () => {
    const query = `
      query KanyeQuery {
        counts(name: "Kanye", gender: M) {
          name,
          gender,
          count,
          year
        }
      }
    `;
    const result = await graphql(BabyNamesSchema, query);
    assert.equal(result.data.counts.length, 11);
  });

  it('Finds all the results for Kanye M', async () => {
    const query = `
      query KanyeQuery {
        counts(name: "Kanye", gender: M) {
          name,
          gender,
          count,
          year
        }
      }
    `;
    const result = await graphql(BabyNamesSchema, query);
    const expected = kanyeResults;
    assert.deepEqual(result, expected);
  });
});
