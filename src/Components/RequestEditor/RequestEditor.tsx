import { FC, useState } from 'react';
import { Box } from '@mui/material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { btnsWrapper, cleanBtn, prettifyBtn, sectionContainer } from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { updateQuery } from '../../store/slices/querySlice';
import formatGraphQLQuery from '../../utils/formatGraphQLQuery';
import CodeEditor from '../CodeEditor/CodeEditor';
import CustomIconButton from '../CustomIconButton/CustomIconButton';
import Storage from '../../utils/Storage/Storage';

const RequestEditor: FC = () => {
  const dispatch = useAppDispatch();
  const { isSchema } = useAppSelector((state) => state.ApiData);
  const { value } = useAppSelector((state) => state.querySlice);
  const [codeValue, setCodeValue] = useState(value);

  function onSave(query: string) {
    dispatch(updateQuery(query));
    const formatedValue = formatGraphQLQuery(query);
    setCodeValue(formatedValue);
    Storage.saveRequest(formatedValue);
  }

  function onClean() {
    dispatch(updateQuery(''));
    setCodeValue('');
    Storage.saveRequest('');
  }

  function onChange(queryValue: string) {
    dispatch(updateQuery(queryValue));
    Storage.saveRequest(queryValue);
    setCodeValue(queryValue);
  }

  return (
    <Box sx={sectionContainer} width="100%">
      <CodeEditor
        readOnly={!isSchema}
        codeValue={codeValue}
        onChange={onChange}
      />
      <Box sx={btnsWrapper}>
        <CustomIconButton
          sx={prettifyBtn}
          onClick={() => onSave(codeValue)}
          icon={<AutoFixHighOutlinedIcon />}
        />
        <CustomIconButton
          sx={cleanBtn}
          onClick={onClean}
          icon={<DeleteForeverOutlinedIcon />}
        />
      </Box>
    </Box>
  );
};

export default RequestEditor;
