import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import { sectionRespContainer } from './styles';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useLazyFetchGrathQlQuery } from '../../api/rtk-api';
import { useAppSelector } from '../../hooks/store';
import { useDataContext } from '../../DataContext/useDataContext';
import FetchingStatus from '../../common-types/fetching-status';
import ErrorMessages from '../../assets/errorMessages.json';
import UIStrings from '../../assets/UIStrings.json';
import { ErrorResponse } from '../../common-types/error-types';
import CustomButton from '../CustomButton/CustomButton';

// const baseUrl = 'https://graphql-pokemon2.vercel.app';
// const query = `query fn($varId: Int!) {pokemons(first: $varId) {name id}}`;
// const variables = `{ "varId": 1 }`;
// const headers = `{
//   "Type": "text/html; charset=utf-8"
// }`;

const ResponseSection: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseValue, setResponseValue] = useState('');
  const { language } = useDataContext();

  // https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#uselazyquery
  const [trigger, result] = useLazyFetchGrathQlQuery();
  const {
    value: query,
    headers,
    variables,
  } = useAppSelector((state) => state.querySlice);
  const baseUrl = useAppSelector((state) => state.ApiData);

  useEffect(() => {
    const { data, status, isError, error } = result;
    if (isError) {
      const errorMessage =
        (error as ErrorResponse)?.data?.errors[0]?.message ||
        `${ErrorMessages.ERROR_FETCH_DATA[language]}: ${
          (error as ErrorResponse).status
        }`;
      enqueueSnackbar(`${errorMessage}`, {
        variant: 'error',
      });
      setResponseValue(`${errorMessage}`);
    } else if (status.toString() === FetchingStatus.FULFILLED) {
      setResponseValue(JSON.stringify(data, null, 2));
    }
  }, [result, language, enqueueSnackbar]);

  const getData = async () => {
    if (isHeadersValid(headers)) {
      await trigger({
        baseUrl: baseUrl.baseUrl,
        query,
        variables,
        requestHeaders: headers,
      });
    } else {
      setResponseValue(ErrorMessages.ERROR_FETCH_DATA[language]);
    }
  };

  const isHeadersValid = (headersString: string) => {
    try {
      JSON.parse(headersString || '{}');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(`${UIStrings.Headers[language]}: ${error.message}`, {
          variant: 'error',
        });
      }
      return false;
    }
  };

  return (
    <Box sx={sectionRespContainer}>
      <CodeEditor readOnly={true} codeValue={responseValue} />
      <CustomButton onClick={getData} title="get data" />
    </Box>
  );
};

export default ResponseSection;
