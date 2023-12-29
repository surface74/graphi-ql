import * as React from 'react';
import { Box, Fab, TextField } from '@mui/material';
import {
  endpointField,
  openDocsButton,
  submitButton,
  wrapperBaseUrl,
} from './styles';
import { setApiErrorMessage, setBaseUrl } from '../../store/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { useLazyFetchSchemaQuery } from '../../api/rtk-api';
import ReplayIcon from '@mui/icons-material/Replay';
import { setDocsIsOpen, setIsLoadingSchema } from '../../store/slices/UISlice';
import { useAppSelector } from '../../hooks/store';
import Loader from '../Loader/Loader';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { endpointSchema } from '../../yup/endpointSchema';
import { useEffect, useState } from 'react';

// const endpoints = [
//   'https://graphql-pokemon2.vercel.app/',
//   'https://graphqlzero.almansi.me/api/',
//   'https://rickandmortyapi.com/graphql/',
//   'https://www.universe.com/graphiql',
//   'https://api.catalysis-hub.org/graphql',
//   'https://countries.trevorblades.com/',
// ];

const Endpoint: React.FC = () => {
  const [urlInputValue, setUrlInputValue] = useState('');
  const [docsButtonDisabled, setDocsButtonDisabled] = useState(false);
  const [trigger, result] = useLazyFetchSchemaQuery();
  const { language } = useDataContext();
  const dispatch = useDispatch();

  const { baseUrl, errorMessage: errorApiMessage } = useAppSelector(
    (store) => store.ApiData
  );
  const { docsIsOpen, isLoadingSchema } = useAppSelector(
    (state) => state.UIData
  );
  const { enqueueSnackbar } = useSnackbar();
  const baseUrlSchemaValidation = endpointSchema(language);

  const formik = useFormik({
    initialValues: {
      baseUrl: '',
    },
    validationSchema: baseUrlSchemaValidation,
    onSubmit: ({ baseUrl }) => {
      handleSubmit(baseUrl);
      trigger(baseUrl);
    },
    validateOnChange: true,
  });

  const handleSubmit = (baseUrl: string) => {
    dispatch(setBaseUrl(baseUrl));
    dispatch(setDocsIsOpen(false));
  };

  useEffect(() => {
    if (errorApiMessage && JSON.parse(errorApiMessage)[language].length > 0) {
      enqueueSnackbar(JSON.parse(errorApiMessage)[language], {
        variant: 'error',
      });
      dispatch(setApiErrorMessage(''));
    }
  }, [dispatch, errorApiMessage, enqueueSnackbar, language]);

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  const handleChangeUrl = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    formik.handleChange(event);
    dispatch(setDocsIsOpen(false));

    setUrlInputValue(event.target.value);
    dispatch(setBaseUrl(''));

    if (baseUrl.length > 0) trigger(baseUrl);
  };

  useEffect(() => {
    const { data, isError, error, isLoading } = result;

    const isButtonDisabled = !!!data || isError || !!error || !baseUrl;
    setDocsButtonDisabled(isButtonDisabled);

    setIsLoadingSchema(isLoading);
  }, [result, baseUrl, result.isLoading]);

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
      <Fab sx={submitButton} type="submit" disabled={!formik.isValid}>
        <ReplayIcon />
      </Fab>
      {isLoadingSchema ? (
        <Loader />
      ) : (
        <Fab
          sx={openDocsButton}
          onClick={handleDocsMenu}
          disabled={!formik.isValid || docsButtonDisabled}
        >
          {UIContent.Schema[language]}
        </Fab>
      )}
    </Box>
  );
};

export default Endpoint;
