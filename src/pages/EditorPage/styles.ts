import { SxProps, Theme } from '@mui/material';

export const wrapperComponent = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  border: '1px solid white',
  padding: '1rem',
};

export const graphqlHeading = {
  color: 'primary',
  textAlign: 'center',
  pb: 10,
};

export const wrapperGraphQL: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(9, 1fr)',
  // gridAutoRows: '8.7vh',
  gap: 10,
  border: '1px solid white',
  padding: '1rem',
};

export const wrapperEndpoint: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '1/8',
  gridRow: '1/2',
};

export const wrapperDocsButton: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '8/9',
  gridRow: '1/2',
};

export const wrapperRequestEditor: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '1/5',
  gridRow: '2/7',
};

export const wrapperResponseSection: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '5/9',
  gridRow: '2/7',
};

export const wrapperVariablesEditor: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '1/3',
  gridRow: '7/10',
};

export const wrapperHeadersEditor: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '3/5',
  gridRow: '7/10',
};

export const wrapperDocumentation: SxProps<Theme> = {
  position: 'absolute',
  zIndex: 2,
  backfaceVisibility: 'hidden',
  padding: '1rem',
  transform: 'translateZ(0)',
  transition: 'opacity 1s',
  height: '70vh',
  top: '250px',
  right: '0',
  background: '#bbb9b9',
};
