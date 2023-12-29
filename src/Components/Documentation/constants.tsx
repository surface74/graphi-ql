export const DEFAULT_CURRENT_FIELD = {
  name: '',

  args: [],
  type: {
    kind: '',
  },
  isDeprecated: false,
  deprecationReason: {
    name: '',
  },
};

export enum DocsFiedsTypes {
  'OBJECT' = 'OBJECT',
  'SCALAR' = 'SCALAR',
}

export const DOCS_HEADERS = {
  Documentation: 'Documentation',
  Type_details: 'TYPE DETAILS',
  Arguments: 'ARGUMENTS',
  Mutation: 'Mutation:',
  Subscription: 'Subscription:',
  Queries: 'Queries:',
} as const;
