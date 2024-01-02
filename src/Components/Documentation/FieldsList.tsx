import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  activePoint,
  exampleText,
  flexColumnCenter,
  hideBlock,
  schemaHeading,
  sectionHeading,
  sectionSubHeading,
  showBlock,
  wrapperDocsSection,
  wrapperNextDocsSection,
} from './styles';
import styles from './styles.module.scss';
import { Field, Type } from '../../common-types/schema.types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import {
  DEFAULT_CURRENT_FIELD,
  DOCS_HEADERS,
  DocsFiedsTypes,
} from './constants';
import ArgsList from './ArgsList';
import { FieldsListProps } from './Documentation.types';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';
import { getFieldTypeName } from '../../utils/getFieldTypeName';

const FieldsList: React.FC<FieldsListProps> = ({
  currentFiledType,
  currentFiled,
  types,
}) => {
  const { language } = useDataContext();
  const [sectionIsOpen, setSectionIsOpen] = useState(true);
  const [activeDocsLink, setActiveDocsLink] = useState('');
  const [currentNextFiled, setCurrentField] = useState<Field>(
    DEFAULT_CURRENT_FIELD
  );
  const [currentNextFiledType, setCurrentNextFieldType] = useState('');

  const handlerOpenTypes = (field: Field, currentNextFieldType: string) => {
    setCurrentNextFieldType(currentNextFieldType);
    setCurrentField(field);
    setActiveDocsLink(field.name);
    setSectionIsOpen(false);
  };

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={wrapperDocsSection}>
      {currentFiledType && (
        <Box
          sx={
            isMobileView
              ? Object.assign(
                  {},
                  wrapperNextDocsSection,
                  sectionIsOpen ? showBlock : hideBlock
                )
              : wrapperNextDocsSection
          }
        >
          <Typography sx={sectionHeading} variant="h4">
            {UIContent[DOCS_HEADERS.Type_details][language]}
          </Typography>

          <Typography sx={sectionSubHeading}>
            {currentFiled.description}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={exampleText}
          >{`type ${currentFiledType} {`}</Typography>

          {Object.values(types as Type[]).map((type) => {
            if (
              type.name.startsWith('__') ||
              type.kind !== DocsFiedsTypes.OBJECT.toString()
            ) {
              return null;
            }
            if (type.name === currentFiledType) {
              return type.fields?.map((field: Field, k: number) => {
                const fieldType = getFieldTypeName(field);

                return (
                  <Box
                    key={k}
                    sx={Object.assign(
                      {},
                      wrapperDocsSection,
                      activeDocsLink === field.name && activePoint
                    )}
                    className={`${styles.queryLine}`}
                    onClick={() => {
                      if (typeof fieldType === 'string')
                        handlerOpenTypes(field, fieldType);
                    }}
                  >
                    <Typography sx={schemaHeading} variant="h4">
                      {`${field.name}: ${
                        typeof fieldType === 'string' ? fieldType : 'unknown'
                      }`}
                    </Typography>

                    {(field.args.length > 0 || fieldType) && (
                      <IconButton>
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    )}
                  </Box>
                );
              });
            }
          })}
          <Typography variant="subtitle1" sx={exampleText}>{`}`}</Typography>
        </Box>
      )}

      {currentNextFiledType && (
        <Box
          sx={
            isMobileView
              ? Object.assign(
                  {},
                  flexColumnCenter,
                  sectionIsOpen ? hideBlock : showBlock
                )
              : flexColumnCenter
          }
        >
          {/* <Box sx={flexColumnCenter}> */}
          <FieldsList
            currentFiledType={currentNextFiledType}
            currentFiled={currentNextFiled}
            types={types}
          />

          <ArgsList currentFiled={currentNextFiled} />
          {/* </Box> */}
        </Box>
      )}
    </Box>
  );
};

export default FieldsList;
