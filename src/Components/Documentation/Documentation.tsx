import { FC, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  flexRowCenter,
  returnTitle,
  schemaTitle,
  wrapperDocsContent,
} from './styles';
import DocsSection from './DocsSection';
import { setDocsIsOpen } from '../../store/slices/UISlice';
import { useDispatch } from 'react-redux';
import { useFetchSchemaQuery } from '../../api/rtk-api';
import { useAppSelector } from '../../hooks/store';
import { DOCS_HEADERS } from './constants';
import { useDataContext } from '../../DataContext/useDataContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UIContent from '../../assets/UIStrings.json';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { parseQueryError } from '../../utils/parse-query-error';

const Documentation: FC = () => {
  const dispatch = useDispatch();
  const { language } = useDataContext();
  const [key, setKey] = useState(0);
  const docsIsOpen = useAppSelector((state) => state.UIData.docsIsOpen);
  const baseUrl = useAppSelector((store) => store.ApiData.baseUrl);
  const { data, isError, error } = useFetchSchemaQuery(baseUrl);
  const schema = data?.data.__schema;
  const mutationType = schema?.mutationType;
  const subscriptionType = schema?.subscriptionType;
  const types = schema?.types;
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  const handleBackToQueries = () => {
    setKey(key + 1);
  };

  useEffect(() => {
    if (isError) {
      dispatch(setDocsIsOpen(false));
      const errorMessage = parseQueryError(error, language);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }
  }, [dispatch, enqueueSnackbar, isError, error, language]);

  return (
    isError || (
      <Box>
        <Typography variant="h4" sx={schemaTitle} onClick={handleDocsMenu}>
          {UIContent[DOCS_HEADERS.Documentation][language]}
        </Typography>

        {isMobileView && (
          <Box sx={flexRowCenter} onClick={() => handleBackToQueries()}>
            <IconButton>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography sx={returnTitle} variant="h4">
              {UIContent[DOCS_HEADERS.Back_to_queries][language]}
            </Typography>
          </Box>
        )}

        <Box sx={wrapperDocsContent}>
          {mutationType ? (
            <DocsSection
              heading={UIContent[DOCS_HEADERS.Mutation][language]}
              types={mutationType}
            />
          ) : null}

          {subscriptionType ? (
            <DocsSection
              heading={UIContent[DOCS_HEADERS.Subscription][language]}
              types={subscriptionType}
            />
          ) : null}

          {types ? (
            <DocsSection
              key={key}
              heading={UIContent[DOCS_HEADERS.Queries][language]}
              types={types}
            />
          ) : null}
        </Box>
      </Box>
    )
  );
};

export default Documentation;
