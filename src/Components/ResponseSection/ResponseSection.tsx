import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import {
  sectionRespContainer,
  runBtn,
  buttonWrapper,
  buttonWrapperMobile,
} from './styles';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useLazyFetchGrathQlQuery } from '../../api/rtk-api';
import { useAppSelector } from '../../hooks/store';
import { useDataContext } from '../../DataContext/useDataContext';
import FetchingStatus from '../../common-types/fetching-status';
import ErrorMessages from '../../assets/errorMessages.json';
import UIStrings from '../../assets/UIStrings.json';
import CustomIconButton from '../CustomIconButton/CustomIconButton';
import { parseQueryError } from '../../utils/parse-query-error';

const ResponseSection: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [responseValue, setResponseValue] = useState('');
  const { language } = useDataContext();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

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
      const errorMessage = parseQueryError(error, language);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
      setResponseValue(`${errorMessage}`);
    } else if (status.toString() === FetchingStatus.FULFILLED) {
      setResponseValue(JSON.stringify(data, null, 2));
    }
  }, [result, language, enqueueSnackbar]);

  const getData = async () => {
    if (!baseUrl.baseUrl) {
      setResponseValue(ErrorMessages.CHECK_BASE_URL_REQUIRED[language]);
      return;
    }
    if (!isStringValidJSON(headers, UIStrings.Headers[language])) {
      setResponseValue(ErrorMessages.CHECK_HEADERS_FORMAT[language]);
      return;
    }
    if (!isStringValidJSON(variables, UIStrings.Variables[language])) {
      setResponseValue(ErrorMessages.CHECK_VARIABLES_FORMAT[language]);
      return;
    }

    await trigger({
      baseUrl: baseUrl.baseUrl,
      query,
      variables,
      requestHeaders: headers,
    });
  };

  const isStringValidJSON = (
    checkedString: string,
    errorMessage: string
  ): boolean => {
    try {
      JSON.parse(checkedString || '{}');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(`${errorMessage}: ${error.message}`, {
          variant: 'error',
        });
      }
      return false;
    }
  };

  return (
    <>
      <Box
        sx={isMobileView ? buttonWrapperMobile : buttonWrapper}
        data-testid="response-section"
      >
        <CustomIconButton
          sx={runBtn}
          onClick={getData}
          icon={<PlayCircleOutlineOutlinedIcon />}
        />
      </Box>
      <Box sx={sectionRespContainer}>
        <CodeEditor readOnly={true} codeValue={responseValue} />
      </Box>
    </>
  );
};

export default ResponseSection;
