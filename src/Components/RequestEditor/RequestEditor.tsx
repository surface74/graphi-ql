import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditorJS from '@editorjs/editorjs';
import { wrappwerTextEditor } from './styles';

const RequestEditor: React.FC = () => {
  const editor = new EditorJS({
    holder: 'editor',
    minHeight: 0,
    autofocus: true,
    onReady: () => {
      console.log('Editor.js is ready to work!');
    },
  });

  console.log(editor);

  const onSave = () => {
    editor
      .save()
      .then((outputData) => {
        console.log('Article data: ', outputData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <Box>
      <Typography variant="h4">RequestEditor</Typography>
      <Box sx={wrappwerTextEditor} id="editor">
        <Button variant="contained" onClick={onSave}>
          OnSave
        </Button>
      </Box>
    </Box>
  );
};

export default RequestEditor;
