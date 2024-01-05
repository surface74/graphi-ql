import { render, screen } from '@testing-library/react';
import { it, vi } from 'vitest';
import CodeEditor from './CodeEditor';

const value = 'Test code';
it('render editor correctly', () => {
  const mockOnChange = vi.fn();
  render(
    <CodeEditor readOnly={false} onChange={mockOnChange} codeValue={value} />
  );

  const editorElement = screen.getByTestId('code-editor-box');
  expect(editorElement).toBeInTheDocument();
});
