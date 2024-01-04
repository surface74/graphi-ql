import { fireEvent, render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import CodeEditor from './CodeEditor';

vi.mock('@uiw/react-codemirror', () => {
  return {
    __esModule: true,
    default: ({
      onChange,
      value,
    }: {
      onChange: (value: string) => void;
      value: string;
    }) => {
      return (
        <textarea onChange={(e) => onChange(e.target.value)} value={value} />
      );
    },
    EditorView: {
      lineWrapping: {},
    },
  };
});

test('renders CodeEditor component', () => {
  const mockOnChange = vi.fn();
  render(
    <CodeEditor
      readOnly={false}
      onChange={mockOnChange}
      codeValue="Test code"
    />
  );

  const editorElement = screen.getByTestId('code-editor-box');
  expect(editorElement).toBeInTheDocument();
});

test('onChange is called when CodeEditor content changes', () => {
  const mockOnChange = vi.fn();
  render(
    <CodeEditor
      readOnly={false}
      onChange={mockOnChange}
      codeValue="Test code"
    />
  );

  const textarea = screen.getByRole('textbox');
  fireEvent.change(textarea, { target: { value: 'New code' } });

  expect(mockOnChange).toHaveBeenCalledWith('New code');
});
