import CodeEditor from '../CodeEditor/CodeEditor';
import { FC } from 'react';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { updateHeaders } from '../../store/slices/querySlice';
import Storage from '../../utils/Storage/Storage';

const HeadersEditor: FC = () => {
  const dispatch = useAppDispatch();
  const { headers } = useAppSelector((state) => state.querySlice);

  const handlerChange = (value: string) => {
    Storage.saveHeaders(value);
    dispatch(updateHeaders(value));
  };

  return (
    <CodeEditor
      extensions={[json(), linter(jsonParseLinter())]}
      readOnly={false}
      codeValue={headers}
      height={'15vh'}
      minHeight={'15vh'}
      onChange={handlerChange}
    />
  );
};

export default HeadersEditor;
