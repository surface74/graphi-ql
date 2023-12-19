import { Box } from '@mui/material';
import { sectionRespContainer } from './styles';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useCallback, useState } from 'react';

const ResponseSection: React.FC = () => {
  const [value, setValue] = useState('');

  const getData = useCallback(async () => {
    const res = await fetch(
      'https://api.potterdb.com/v1/characters/?filter[name_cont_any]=draco'
    );
    const data = await res.json();
    console.log(data);
    setValue(JSON.stringify(data.data[0], null, 2));
    return;
  }, []);

  return (
    <Box sx={sectionRespContainer}>
      <CodeEditor readOnly={true} codeValue={value} />
      <button onClick={getData}>get data</button>
    </Box>
  );
};

export default ResponseSection;
