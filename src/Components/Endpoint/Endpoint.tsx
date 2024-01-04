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
import { ErrorResponse, ErrorFetch } from '../../common-types/error-types';
import Storage from '../../utils/Storage/Storage';

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
    dispatch(setBaseUrl(''));
  };

  useEffect(() => {
    const { data, isError, error, isLoading, isFetching } = result;

    if (isError) {
      if (Object.hasOwn(error, 'status')) {
        if ((error as ErrorResponse).status === 404) {
          enqueueSnackbar(ErrorMessages.ERROR_404[language], {
            variant: 'error',
          });
        }
        if ((error as ErrorFetch).status === 'FETCH_ERROR') {
          enqueueSnackbar(ErrorMessages.ACCSESS_DENIED[language], {
            variant: 'error',
          });
        } else {
          enqueueSnackbar((error as ErrorFetch).error, {
            variant: 'error',
          });
        }
      }
    }

    const isButtonDisabled =
      !!!data || isError || !!error || !baseUrl || isFetching || isLoading;
    setDocsButtonDisabled(isButtonDisabled);
    dispatch(hasSchema(!docsButtonDisabled));
    dispatch(setIsLoadingSchema(isLoading || isFetching));
  }, [
    dispatch,
    enqueueSnackbar,
    language,
    result.data,
    result,
    baseUrl,
    result.isLoading,
    docsButtonDisabled,
  ]);

  return (
    <Box sx={wrapperBaseUrl} component="form" onSubmit={formik.handleSubmit}>
      <TextField
        sx={endpointField}
        margin="normal"
        required
        fullWidth
        id="baseUrl"
        name="baseUrl"
        value={urlInputValue}
        onChange={handleChangeUrl}
        onBlur={formik.handleBlur}
        error={formik.touched.baseUrl && Boolean(formik.errors.baseUrl)}
        helperText={formik.touched.baseUrl && formik.errors.baseUrl}
        autoFocus
      />
      <Fab
        sx={submitButton}
        type="submit"
        disabled={!formik.isValid}
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
