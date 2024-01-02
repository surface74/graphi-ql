import * as React from 'react';
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

const Documentation: React.FC = () => {
  const dispatch = useDispatch();
  const { language } = useDataContext();
  const [key, setKey] = useState(0);
  const docsIsOpen = useAppSelector((state) => state.UIData.docsIsOpen);
  const baseUrl = useAppSelector((store) => store.ApiData.baseUrl);
  const { data, isError } = useFetchSchemaQuery(baseUrl);
  const schema = data?.data.__schema;
  const mutationType = schema?.mutationType;
  const subscriptionType = schema?.subscriptionType;
  const types = schema?.types;
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  const handleBackToQueries = () => {
    setKey(key + 1);
  };

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
