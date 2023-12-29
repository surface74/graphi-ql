import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { schemaTitle, wrapperDocsContent } from './styles';
import DocsSection from './DocsSection';
import { setDocsIsOpen } from '../../store/slices/UISlice';
import { useDispatch } from 'react-redux';
import { useFetchSchemaQuery } from '../../api/rtk-api';
import { useAppSelector } from '../../hooks/store';
import { DOCS_HEADERS } from './constants';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';

const Documentation: React.FC = () => {
  const dispatch = useDispatch();
  const { language } = useDataContext();
  const docsIsOpen = useAppSelector((state) => state.UIData.docsIsOpen);
  const baseUrl = useAppSelector((store) => store.ApiData.baseUrl);
  const { data, isError } = useFetchSchemaQuery(baseUrl);
  const schema = data?.data.__schema;
  const mutationType = schema?.mutationType;
  const subscriptionType = schema?.subscriptionType;
  const types = schema?.types;

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  return (
    isError || (
      <Box>
        <Typography variant="h4" sx={schemaTitle} onClick={handleDocsMenu}>
          {UIContent[DOCS_HEADERS.Documentation][language]}
        </Typography>
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
