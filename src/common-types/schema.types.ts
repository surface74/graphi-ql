export interface ApiRequest {
  data: {
    __schema: RootSchema;
  };
}

export interface RootSchema {
  queryType: QueryType;
  mutationType: MutationType;
  subscriptionType: commonType;
  types: Type[];
  directives: Direc[];
  description?: string;
}

export interface MutationType {
  name: string;
}

export interface QueryType {
  fields: QueryType | QueryType[] | Type | Type[] | Field | Field[];
  name: string;
}

export interface commonType {
  name: string;
}

export interface Type {
  kind: string;
  name: string;
  description: string;
  fields?: Field[];
  inputFields?: InputField[];
  interfaces?: string[];
  enumValues?: EnumValue[];
  possibleTypes: commonType;
}

export interface Field {
  name: string;
  description?: string;
  args: Arg[];
  type: OfType;
  isDeprecated: boolean;
  deprecationReason: commonType;
}

export interface Arg {
  name: string;
  description?: string;
  type: OfType;
  defaultValue?: string;
}

export interface OfType {
  kind: string;
  name?: string | commonType;
  ofType?: OfType | commonType;
}

export interface InputField {
  name: string;
  description: string;
  type: OfType;
  defaultValue: commonType;
}

export interface EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: commonType;
}

export interface Direc {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
}
