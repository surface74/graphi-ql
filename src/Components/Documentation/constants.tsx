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

export enum DocsHeaders {
  'Documentation' = 'Documentation',
  'Type_details' = 'TYPE DETAILS',
  'Arguments' = 'ARGUMENTS',
  'Mutation' = 'Mutation:',
  'Subscription' = 'Subscription:',
  'Queries' = 'Queries:',
}

export enum DocsFiedsTypes {
  'OBJECT' = 'OBJECT',
  'SCALAR' = 'SCALAR',
}
