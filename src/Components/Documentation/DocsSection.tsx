import { Box, IconButton, Typography } from '@mui/material';
import {
  activePoint,
  flexColumnCenter,
  schemaHeading,
  sectionHeading,
  wrapperDocsSection,
  wrapperNextDocsSection,
} from './styles';
import { Field, Type } from '../../common-types/schema.types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import styles from './styles.module.scss';
import FieldsList from './FieldsList';
import ArgsList from './ArgsList';
import { DEFAULT_CURRENT_FIELD, DocsFiedsTypes } from './constants';
import { DocsSectionProps } from './Documentation.types';
import { getFieldTypeName } from '../../utils/getFieldTypeName';

const DocsSection: React.FC<DocsSectionProps> = ({ heading, types }) => {
  const [activeDocsLink, setActiveDocsLink] = useState('');
  const [currentFiled, setCurrentField] = useState<Field>(
    DEFAULT_CURRENT_FIELD
  );
  const [currentFiledType, setCurrentFieldType] = useState('');

  const handlerOpenTypes = (field: Field, currentFieldType: string) => {
    setCurrentFieldType(currentFieldType);
    setCurrentField(field);
    setActiveDocsLink(field.name);
  };

  const queries = Object.values(types as Type[]).find(
    (el) => el.name === 'Query'
  );
  const fields = queries?.fields;

  return (
    <Box sx={wrapperDocsSection}>
      {fields && (
        <Box sx={wrapperNextDocsSection}>
          <Typography sx={sectionHeading} variant="h4">
            {heading}
          </Typography>

          {fields.map((field: Field, k: number) => {
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
                  {`${field.name}(...): ${
                    typeof fieldType === 'string' ? fieldType : 'unknown'
                  }`}
                </Typography>

                {fieldType !== DocsFiedsTypes.SCALAR.toString() && (
                  <IconButton>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {currentFiledType && (
        <Box sx={flexColumnCenter}>
          <FieldsList
            currentFiledType={currentFiledType}
            currentFiled={currentFiled}
            types={types}
          />

          <ArgsList currentFiled={currentFiled} />
        </Box>
      )}
    </Box>
  );
};

export default DocsSection;
