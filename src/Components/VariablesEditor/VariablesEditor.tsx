import CodeEditor from '../CodeEditor/CodeEditor';
import { FC } from 'react';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { updateVariables } from '../../store/slices/querySlice';

const VariablesEditor: FC = () => {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.querySlice);

  return (
    <CodeEditor
      extensions={[json(), linter(jsonParseLinter())]}
      readOnly={false}
      codeValue={variables}
      height={'15vh'}
      minHeight={'15vh'}
      onChange={(event) => dispatch(updateVariables(event))}
    />
  );
};

export default VariablesEditor;
