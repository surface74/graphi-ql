import { SxProps, Theme } from '@mui/material';

export const wrapperComponent = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'start',
  gap: 10,
  border: '1px solid white',
  padding: '1rem',
};

export const graphqlHeading = {
  color: 'primary',
  textAlign: 'center',
  pb: 10,
};
export const graphqlHeadingMobile = {
  pb: 5,
};

export const wrapperGraphQL: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(9, 1fr)',
  gap: 10,
  border: '1px solid white',
  padding: '1rem',
  height: '69vh',
};

export const wrapperGraphQLMobile: SxProps<Theme> = {
  gridTemplateRows: 'repeat(17, 1fr)',
  height: '120vh',
};

export const wrapperEndpoint: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '1/9',
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
  gridRow: '2/9',
  gridAutoFlow: 'row',
  background: '#2e3440',
};

export const wrapperRequestEditorMobile: SxProps<Theme> = {
  gridColumn: '1/9',
  gridRow: '2/9',
};

export const wrapperResponseSection: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '5/9',
  gridRow: '2/10',
  background: '#2e3440',
};

export const wrapperResponseSectionMobile: SxProps<Theme> = {
  gridColumn: '1/9',
  gridRow: '10/18',
};

export const wrapperHelpersEditor: SxProps<Theme> = {
  ...wrapperComponent,
  background: '#2e3440',
  gridColumn: '1/5',
  border: '',
};

export const wrapperHelpersEditorMobile: SxProps<Theme> = {
  gridColumn: '1/9',
};

export const wrapperHeadersEditor: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '3/5',
  gridRow: '7/10',
};

export const wrapperHeadersEditorMobile: SxProps<Theme> = {
  gridColumn: '6/9',
};

export const wrapperDocumentation: SxProps<Theme> = {
  position: 'absolute',
  zIndex: 10000,
  backfaceVisibility: 'hidden',
  padding: '1rem',
  transform: 'translateZ(0)',
  transition: 'opacity 1s',
  top: '260px',
  right: '0',
  maxWidth: '90%',
  background: '#bbb9b9',
  overflowX: 'auto',
};
