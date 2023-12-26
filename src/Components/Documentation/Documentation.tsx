import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { schemaTitle, wrapperDocsContent } from './styles';
import DocsSection from './DocsSection';
import { setDocsIsOpen } from '../../store/slices/UISlice';
import { useDispatch } from 'react-redux';
import { useFetchSchemaQuery } from '../../api/rtk-api';
import { useAppSelector } from '../../hooks/store';
import { DocsHeaders } from './constants';

const Documentation: React.FC = () => {
  const dispatch = useDispatch();
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
          {DocsHeaders.Documentation}
        </Typography>
        <Box sx={wrapperDocsContent}>
          {mutationType ? (
            <DocsSection
              heading={DocsHeaders.Mutation.toString()}
              types={mutationType}
            />
          ) : null}

          {subscriptionType ? (
            <DocsSection
              heading={DocsHeaders.Subscription.toString()}
              types={subscriptionType}
            />
          ) : null}

          {types ? (
            <DocsSection
              heading={DocsHeaders.Queries.toString()}
              types={types}
            />
          ) : null}
        </Box>
      </Box>
    )
  );
};

export default Documentation;
