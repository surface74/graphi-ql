import { FC, useState } from 'react';
import { Box, Fab } from '@mui/material';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
  btnsWrapper,
  cleanBtn,
  prettifyBtn,
  runBtn,
  sectionContainer,
} from './styles';
import { useAppDispatch } from '../../hooks/store';
import { updateQuery } from '../../store/slices/querySlice';
import formatGraphQLQuery from '../../utils/formatGraphQLQuery';
import CodeEditor from '../CodeEditor/CodeEditor';

const RequestEditor: FC = () => {
  const dispatch = useAppDispatch();
  const [codeValue, setCodeValue] = useState('');

  function onSave(value: string) {
    dispatch(updateQuery(value));
    const formatedValue = formatGraphQLQuery(value);
    setCodeValue(formatedValue);
  }

  function onClean() {
    dispatch(updateQuery(''));
    setCodeValue('');
  }

  function onChange(value: string) {
    setCodeValue(value);
  }

  return (
    <Box sx={sectionContainer} width="100%">
      <CodeEditor readOnly={false} codeValue={codeValue} onChange={onChange} />
      <Box sx={btnsWrapper}>
        <Fab sx={runBtn} onClick={() => onSave(codeValue)}>
          <PlayCircleOutlineOutlinedIcon />
        </Fab>
        <Fab sx={prettifyBtn} onClick={() => onSave(codeValue)}>
          <AutoFixHighOutlinedIcon />
        </Fab>
        <Fab sx={cleanBtn} onClick={onClean}>
          <DeleteForeverOutlinedIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default RequestEditor;
