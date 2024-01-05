import { Box } from '@mui/material';
import CodeMirror, { EditorView, Extension } from '@uiw/react-codemirror';
import { nord } from '@uiw/codemirror-theme-nord';
import { wrappwerTextEditor } from './styles';

type CodeEditorProps = {
  readOnly: boolean;
  extensions?: Extension[];
  onChange?: (value: string) => void;
  codeValue: string;
  height?: string;
  minHeight?: string;
};

const CodeEditor = ({
  readOnly,
  extensions,
  onChange,
  codeValue,
  height,
  minHeight,
}: CodeEditorProps) => {
  return (
    <Box sx={wrappwerTextEditor} id="editor" data-testid="code-editor-box">
      <CodeMirror
        readOnly={readOnly}
        extensions={
          extensions && extensions.length > 0
            ? [...extensions, EditorView.lineWrapping]
            : [EditorView.lineWrapping]
        }
        basicSetup={{ highlightActiveLine: false }}
        width="100%"
        minHeight={minHeight ?? '100%'}
        theme={nord}
        value={codeValue}
        onChange={onChange}
        maxHeight={height}
      />
    </Box>
  );
};

export default CodeEditor;
