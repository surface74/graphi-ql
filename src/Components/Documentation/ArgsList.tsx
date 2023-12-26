import { Box, Typography } from '@mui/material';
import {
  schemaHeading,
  sectionHeading,
  wrapperDocsSection,
  wrapperNextDocsSection,
} from './styles';
import { ArgsListProps } from './Documentation.types';
import { DocsHeaders } from './constants';
import UIContent from '../../assets/UIStrings.json';
import { useDataContext } from '../../DataContext/useDataContext';
import { getFieldTypeName } from '../../utils/getFieldTypeName';

const ArgsList: React.FC<ArgsListProps> = ({ currentFiled }) => {
  const { language } = useDataContext();
  return (
    <>
      {currentFiled.args.length > 0 && (
        <Box sx={wrapperNextDocsSection}>
          <Typography sx={sectionHeading} variant="h4">
            {UIContent[DocsHeaders.Arguments][language]}
          </Typography>
          {currentFiled.hasOwnProperty('args') && currentFiled.args.length > 0
            ? currentFiled.args.map((arg, j) => {
                const argType = getFieldTypeName(arg);

                return (
                  <Box key={j} sx={wrapperDocsSection}>
                    <Typography sx={schemaHeading} variant="h4">
                      {`${arg.name}: ${argType}`}
                    </Typography>
                  </Box>
                );
              })
            : null}
        </Box>
      )}
    </>
  );
};

export default ArgsList;
