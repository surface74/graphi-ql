import * as React from 'react';
import { Box, Fab, TextField } from '@mui/material';
import {
  endpointField,
  openDocsButton,
  submitButton,
  wrapperBaseUrl,
} from './styles';
import { setBaseUrl } from '../../store/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { useFetchSchemaQuery } from '../../api/rtk-api';
import ReplayIcon from '@mui/icons-material/Replay';
import { setDocsIsOpen } from '../../store/slices/UISlice';
import { useAppSelector } from '../../hooks/store';
import Loader from '../Loader/Loader';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';
import { useSnackbar } from 'notistack';
import errorMessages from '../../assets/errorMessages.json';
import { useFormik } from 'formik';
import { endpointSchema } from '../../yup/endpointSchema';

// const endpoints = [
//   'https://graphql-pokemon2.vercel.app/',
//   'https://graphqlzero.almansi.me/api/',
//   'https://rickandmortyapi.com/graphql/',
//   'https://www.universe.com/graphiql',
//   'https://api.catalysis-hub.org/graphql',
//   'https://countries.trevorblades.com/',
// ];

const Endpoint: React.FC = () => {
  const { language } = useDataContext();
  const dispatch = useDispatch();
  const baseUrl = useAppSelector((store) => store.ApiData.baseUrl);
  const schema = useFetchSchemaQuery(baseUrl);
  const { isLoading, isError, error } = useFetchSchemaQuery(baseUrl);
  const docsIsOpen = useAppSelector((state) => state.UIData.docsIsOpen);
  const { enqueueSnackbar } = useSnackbar();
  const baseUrlSchemaValidation = endpointSchema(language);

  const formik = useFormik({
    initialValues: {
      baseUrl: '',
    },
    validationSchema: baseUrlSchemaValidation,
    onSubmit: ({ baseUrl }) => {
      myHandleSubmit(baseUrl);
    },
    validateOnChange: true,
  });

  const myHandleSubmit = (baseUrl: string) => {
    dispatch(setBaseUrl(baseUrl));
    dispatch(setDocsIsOpen(false));

    if (error) {
      if ('status' in error) {
        const message =
          'error' in error ? error.error : JSON.stringify(error.data);
        message === 'null'
          ? null
          : enqueueSnackbar(message, { variant: 'error' });
      } else {
        enqueueSnackbar(errorMessages.ERROR_MESSAGE[language], {
          variant: 'error',
        });
      }
    }
  };

  const handleDocsMenu = () => {
    dispatch(setDocsIsOpen(!docsIsOpen));
  };

  const handleChangeUrl = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    formik.handleChange(event);
    dispatch(setBaseUrl(''));
  };

  return (
    <Box
      sx={wrapperBaseUrl}
      component="form"
      // onSubmit={handleSubmit}
      onSubmit={formik.handleSubmit}
      // noValidate
    >
      <TextField
        sx={endpointField}
        margin="normal"
        required
        fullWidth
        id="baseUrl"
        name="baseUrl"
        value={formik.values.baseUrl}
        onChange={(event) => handleChangeUrl(event)}
        onBlur={formik.handleBlur}
        error={formik.touched.baseUrl && Boolean(formik.errors.baseUrl)}
        helperText={formik.touched.baseUrl && formik.errors.baseUrl}
        autoFocus
      />
      <Fab sx={submitButton} type="submit" disabled={!formik.isValid}>
        <ReplayIcon />
      </Fab>
      {isLoading ? (
        <Loader />
      ) : (
        <Fab
          sx={openDocsButton}
          onClick={handleDocsMenu}
          disabled={!!!schema.data || isError || error}
        >
          {UIContent.Schema[language]}
        </Fab>
      )}
    </Box>
  );
};

export default Endpoint;
