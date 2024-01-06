import * as React from 'react';
import { Box, CircularProgress, Fab, TextField } from '@mui/material';
import {
  endpointField,
  openDocsButton,
  submitButton,
  wrapperBaseUrl,
} from './styles';
import { hasSchema, setBaseUrl } from '../../store/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { useLazyFetchSchemaQuery } from '../../api/rtk-api';
import ReplayIcon from '@mui/icons-material/Replay';
import { setDocsIsOpen, setIsLoadingSchema } from '../../store/slices/UISlice';
import { useAppSelector } from '../../hooks/store';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { endpointSchema } from '../../yup/endpointSchema';
import { useEffect, useState } from 'react';
import ErrorMessages from '../../assets/errorMessages.json';
import Storage from '../../utils/Storage/Storage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// const endpoints = [
//   'https://graphql-pokemon2.vercel.app/',
//   'https://graphqlzero.almansi.me/api/',
//   'https://rickandmortyapi.com/graphql/',
//   'https://www.universe.com/graphiql',
//   'https://api.catalysis-hub.org/graphql',
//   'https://countries.trevorblades.com/',
// ];

const Endpoint: React.FC = () => {
  const { baseUrl } = useAppSelector((store) => store.ApiData);
  const [urlInputValue, setUrlInputValue] = useState(baseUrl);
  const [docsButtonDisabled, setDocsButtonDisabled] = useState(true);
  const [trigger, result] = useLazyFetchSchemaQuery();

  const { language } = useDataContext();
  const dispatch = useDispatch();

  const { docsIsOpen, isLoadingSchema } = useAppSelector(
    (state) => state.UIData
  );

  const { enqueueSnackbar } = useSnackbar();
  const baseUrlSchemaValidation = endpointSchema(language);

  const formik = useFormik({
    initialValues: {
      baseUrl: baseUrl || '',
    },
    validationSchema: baseUrlSchemaValidation,
    onSubmit: async ({ baseUrl }) => {
      handleSubmit(baseUrl);
      await trigger(baseUrl);
    },
    validateOnChange: true,
  });

  const handleSubmit = (baseUrl: string) => {
    dispatch(setBaseUrl(baseUrl));
    dispatch(setDocsIsOpen(false));
  };

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  const handleChangeUrl = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    Storage.saveEndpoint(event.target.value);
    formik.handleChange(event);
    dispatch(setDocsIsOpen(false));
    setUrlInputValue(event.target.value);
    dispatch(setBaseUrl(event.target.value));
  };

  useEffect(() => {
    const { isError, error, isLoading, isFetching } = result;

    if (isError) {
      if (Object.hasOwn(error, 'status')) {
        const status = (error as FetchBaseQueryError).status;
        const errorMessage =
          typeof status === 'number'
            ? `${ErrorMessages.HTTP_STATUS_CODE[language]}: ${status}`
            : `${ErrorMessages.ERROR_FETCH_DATA[language]}: ${status}`;

        enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
      } else {
        const serializedError = error as SerializedError;
        console.log('serializedError: ', serializedError);
        const status = `${serializedError?.code}: ${serializedError?.message}`;
        enqueueSnackbar(
          `${ErrorMessages.ERROR_FETCH_DATA[language]}: ${status}`,
          {
            variant: 'error',
          }
        );
      }
    }

    const isButtonDisabled = isError || isFetching || isLoading;
    setDocsButtonDisabled(isButtonDisabled);
    dispatch(hasSchema(!docsButtonDisabled));
    dispatch(setIsLoadingSchema(isLoading || isFetching));
  }, [dispatch, enqueueSnackbar, language, result, docsButtonDisabled]);

  return (
    <Box
      sx={wrapperBaseUrl}
      component="form"
      onSubmit={formik.handleSubmit}
      data-testid="endpoint"
    >
      <TextField
        sx={endpointField}
        margin="normal"
        required
        fullWidth
        id="baseUrl"
        name="baseUrl"
        value={urlInputValue}
        onChange={handleChangeUrl}
        onBlur={urlInputValue ? formik.handleBlur : undefined}
        error={formik.touched.baseUrl && Boolean(formik.errors.baseUrl)}
        helperText={formik.touched.baseUrl && formik.errors.baseUrl}
        autoFocus
      />
      <Fab
        sx={submitButton}
        type="submit"
        disabled={!formik.isValid}
        data-testid="submit-btn"
        role="submitButton"
      >
        <ReplayIcon />
      </Fab>
      {isLoadingSchema ? (
        <CircularProgress color="inherit" />
      ) : (
        <Fab
          sx={openDocsButton}
          onClick={handleDocsMenu}
          disabled={!formik.isValid || docsButtonDisabled}
        >
          {UIContent.DOCS[language]}
        </Fab>
      )}
    </Box>
  );
};

export default Endpoint;
