import * as React from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  TextField,
} from '@mui/material';
import {
  endpointField,
  openDocsButton,
  submitButton,
  wrapperBaseUrl,
} from './styles';
import {
  hasSchema,
  isProxyUsed,
  setBaseUrl,
} from '../../store/slices/apiSlice';
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
import Storage from '../../utils/Storage/Storage';
import { parseQueryError } from '../../utils/parse-query-error';

const Endpoint: React.FC = () => {
  const { baseUrl, isProxy } = useAppSelector((store) => store.ApiData);
  const [useProxy, setUseProxy] = useState(isProxy);
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

  const handleUseProxy = () => {
    setUseProxy(!useProxy);
    dispatch(isProxyUsed(!useProxy));
  };

  const formik = useFormik({
    initialValues: {
      baseUrl: baseUrl || '',
    },
    validationSchema: baseUrlSchemaValidation,
    onSubmit: async ({ baseUrl }) => {
      handleSubmit();
      await trigger({ baseUrl, proxy: isProxy });
    },
    validateOnChange: true,
  });

  const handleSubmit = () => {
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
    dispatch(setBaseUrl(event.target.value.trim()));
    setDocsButtonDisabled(true);
  };

  useEffect(() => {
    setDocsButtonDisabled(true);
  }, []);

  useEffect(() => {
    const { data, isError, error, isLoading, isFetching } = result;
    if (isError) {
      const errorMessage = parseQueryError(error, language);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }

    const isButtonDisabled =
      !!!data || isError || isFetching || isLoading || !urlInputValue;
    setDocsButtonDisabled(isButtonDisabled);
    dispatch(hasSchema(!isButtonDisabled));
    dispatch(setIsLoadingSchema(isLoading || isFetching));
  }, [
    dispatch,
    enqueueSnackbar,
    language,
    result,
    docsButtonDisabled,
    urlInputValue,
  ]);

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
          disabled={docsButtonDisabled}
        >
          {UIContent.DOCS[language]}
        </Fab>
      )}

      <FormControlLabel
        label={UIContent.UseProxy[language]}
        control={<Checkbox checked={useProxy} onChange={handleUseProxy} />}
      />
    </Box>
  );
};

export default Endpoint;
