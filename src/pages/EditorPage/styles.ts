import { SxProps, Theme } from '@mui/material';

export const wrapperComponent = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'start',
  gap: 10,
  borderRadius: '0.5rem',
  padding: '1rem',
};

export const graphqlHeading = {
  color: 'primary',
  textAlign: 'center',
  marginBottom: '1rem',
};

export const wrapperGraphQLBasic: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gap: 10,
  height: '70vh',
};

export const wrapperGraphQL: SxProps<Theme> = {
  ...wrapperGraphQLBasic,
  gridTemplateRows: 'repeat(9, 1fr)',
};

export const wrapperGraphQLMobile: SxProps<Theme> = {
  ...wrapperGraphQLBasic,
  gridTemplateRows: 'repeat(17, 1fr)',
  height: '120vh',
};

export const wrapperEndpoint: SxProps<Theme> = {
  ...wrapperComponent,
  padding: '0',
  gridColumn: '1/9',
  gridRow: '1/2',
};

export const wrapperDocsButton: SxProps<Theme> = {
  ...wrapperComponent,
  gridColumn: '8/9',
  gridRow: '1/2',
};

export const wrapperRequestEditorBasic: SxProps<Theme> = {
  ...wrapperComponent,
  gridAutoFlow: 'row',
  background: '#2e3440',
  gridRow: '2/9',
};

export const wrapperRequestEditor: SxProps<Theme> = {
  ...wrapperRequestEditorBasic,
  gridColumn: '1/5',
};

export const wrapperRequestEditorMobile: SxProps<Theme> = {
  ...wrapperRequestEditorBasic,
  gridColumn: '1/9',
};

export const wrapperResponseSectionBasic: SxProps<Theme> = {
  ...wrapperComponent,
  background: '#2e3440',
  position: 'relative',
};

export const wrapperResponseSection: SxProps<Theme> = {
  ...wrapperResponseSectionBasic,
  gridColumn: '5/9',
  gridRow: '2/10',
};

export const wrapperResponseSectionMobile: SxProps<Theme> = {
  ...wrapperResponseSectionBasic,
  gridColumn: '1/9',
  gridRow: '10/18',
};

export const wrapperHelpersEditorBasic: SxProps<Theme> = {
  ...wrapperComponent,
  background: '#2e3440',
  border: '',
};

export const wrapperHelpersEditor: SxProps<Theme> = {
  ...wrapperHelpersEditorBasic,
  gridColumn: '1/5',
};

export const wrapperHelpersEditorMobile: SxProps<Theme> = {
  ...wrapperHelpersEditorBasic,
  gridColumn: '1/9',
};

export const wrapperHeadersEditorBasic: SxProps<Theme> = {
  ...wrapperComponent,
  gridRow: '7/10',
};

export const wrapperHeadersEditor: SxProps<Theme> = {
  ...wrapperHeadersEditorBasic,
  gridColumn: '3/5',
};

export const wrapperHeadersEditorMobile: SxProps<Theme> = {
  ...wrapperHeadersEditorBasic,
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
