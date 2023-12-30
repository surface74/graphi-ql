import CodeEditor from '../CodeEditor/CodeEditor';
import { FC } from 'react';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { updateVariables } from '../../store/slices/querySlice';
import Storage from '../../utils/Storage/Storage';

const VariablesEditor: FC = () => {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.querySlice);
  const { isSchema } = useAppSelector((state) => state.ApiData);

  const handlerChange = (value: string) => {
    Storage.saveVariables(value);
    dispatch(updateVariables(value));
  };

  return (
    <CodeEditor
      extensions={[json(), linter(jsonParseLinter())]}
      readOnly={!isSchema}
      codeValue={variables}
      height={'15vh'}
      minHeight={'15vh'}
      onChange={handlerChange}
    />
  );
};

export default VariablesEditor;
