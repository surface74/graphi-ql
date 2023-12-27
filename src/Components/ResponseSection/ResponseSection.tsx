import { Box } from '@mui/material';
import { sectionRespContainer } from './styles';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useCallback, useState } from 'react';
import axios from 'axios';

const endpoint = 'https://graphql-pokemon2.vercel.app';
const query = `{pokemons(first: 1) {id name} pokemon(id: "UG9rZW1vbjowMDE=") {name}}`;
const proxy = 'http://localhost:8080/proxy';
const body = JSON.stringify({ endpoint, query });

const ResponseSection: React.FC = () => {
  const [value, setValue] = useState('');

  const getData = useCallback(async () => {
    try {
      const response = await axios.post(proxy, body, {
        headers: {
          'content-type': 'application/json',
        },
      });

      setValue(JSON.stringify(response.data, null, 2));
    } catch (e) {
      setValue(e.message);
    }
  }, []);

  return (
    <Box sx={sectionRespContainer}>
      <CodeEditor readOnly={true} codeValue={value} />
      <button onClick={getData}>get data</button>
    </Box>
  );
};

export default ResponseSection;
