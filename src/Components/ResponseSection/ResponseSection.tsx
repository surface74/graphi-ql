import { Box } from '@mui/material';
import { sectionRespContainer } from './styles';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useEffect, useState } from 'react';
import { useLazyFetchGrathQlQuery } from '../../api/rtk-api';

const baseUrl = 'https://graphql-pokemon2.vercel.app';
// const query = `query GetPoke(@id: INT!) {pokemons(first: ) {id name} pokemon(id: "UG9rZW1vbjowMDE=") {name}}`;
const query = `query fn($varId: Int!) {pokemons(first: $varId) {name id}}`;
const variables = `{ "varId": 1 }`;

const ResponseSection: React.FC = () => {
  const [value, setValue] = useState('');

  // https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#uselazyquery
  const [trigger, result] = useLazyFetchGrathQlQuery();

  console.log('result: ', result);

  useEffect(() => {
    const { data, status } = result;
    if (status === 'fulfilled') {
      setValue(JSON.stringify(data, null, 2));
    }
  }, [result]);

  const getData = () => {
    trigger({
      baseUrl,
      query,
      variables,
    });
  };

  return (
    <Box sx={sectionRespContainer}>
      <CodeEditor readOnly={true} codeValue={value} />
      <button onClick={getData}>get data</button>
    </Box>
  );
};

export default ResponseSection;
