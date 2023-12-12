import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/store';
import {
  graphqlHeading,
  wrapperDocsButton,
  wrapperDocumentation,
  // wrapperDocumentation,
  wrapperEndpoint,
  wrapperGraphQL,
  wrapperHeadersEditor,
  wrapperRequestEditor,
  wrapperResponseSection,
  wrapperVariablesEditor,
} from './styles';
import { setDocsIsOpen } from '../../store/slices/UISlice';
import Documentation from '../../Components/Documentation/Documentation';
import HeadersEditor from '../../Components/HeadersEditor/HeadersEditor';
import VariablesEditor from '../../Components/VariablesEditor/VariablesEditor';
import ResponseSection from '../../Components/ResponseSection/ResponseSection';
import RequestEditor from '../../Components/RequestEditor/RequestEditor';
import Endpoint from '../../Components/Endpoint/Endpoint';

// const currentPath = location.pathname;

const EditorPage: React.FC = () => {
  const dispatch = useDispatch();
  const docsIsOpen = useAppSelector((state) => state.UIData.docsIsOpen);

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={graphqlHeading}>
        GraphiQL
      </Typography>
      <Box sx={wrapperGraphQL}>
        <Box sx={wrapperEndpoint}>
          <Endpoint />
        </Box>
        <Box sx={wrapperDocsButton}>
          <Button onClick={handleDocsMenu}>
            <Typography>6 Docs menu</Typography>
          </Button>
        </Box>
        <Box sx={wrapperRequestEditor}>
          <RequestEditor />
        </Box>
        <Box sx={wrapperResponseSection}>
          <ResponseSection />
        </Box>
        <Box sx={wrapperVariablesEditor}>
          <VariablesEditor />
        </Box>
        <Box sx={wrapperHeadersEditor}>
          <HeadersEditor />
        </Box>
        <Box sx={wrapperDocumentation}>{docsIsOpen && <Documentation />}</Box>
      </Box>
    </Container>
  );
};

export default EditorPage;
