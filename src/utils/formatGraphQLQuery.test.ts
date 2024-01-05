import formatGraphQLQuery from './formatGraphQLQuery';

const PLAIN_SOURCE = `{pokemons
  (first: 1


)

{


name}}`;
const EXPECTED_RESULT = `{
  pokemons(first: 1) {
    name
  }
}`;

describe('formatGraphQLQuery()', () => {
  test('return correctly formated output', () => {
    const result = formatGraphQLQuery(PLAIN_SOURCE);
    expect(result).toBe(EXPECTED_RESULT);
  });
});
