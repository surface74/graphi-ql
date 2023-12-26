import { SxProps, Theme } from '@mui/material';

export const flexRowCenter: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'top',
};

export const flexColumnCenter: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'top',
  alignItems: 'left',
  gap: '2rem',
};

export const wrapperDocsContent: SxProps<Theme> = {
  color: 'black',
};

export const schemaHeading: SxProps<Theme> = {
  width: '100%',
  fontSize: '1.8rem',
  color: '#F1DAC4',
  padding: '1rem',
};

export const sectionHeading: SxProps<Theme> = {
  width: '100%',
  borderBottom: '1px solid #eee',
  fontSize: '2rem',
  color: '#F1DAC4',
  padding: '1rem',
};

export const sectionSubHeading: SxProps<Theme> = {
  width: '100%',
  fontSize: '2rem',
  color: '#535bf2',
  padding: '1rem',
};

export const exampleText: SxProps<Theme> = {
  width: '100%',
  fontSize: '2rem',
  color: '#bfeb61',
  padding: '1rem',
};

export const schemaTitle: SxProps<Theme> = {
  ...schemaHeading,
  color: '#2e3440',
  cursor: 'pointer',
};

export const schemaTypes: SxProps<Theme> = {
  fontSize: '1.8rem',
  fontWeight: '600',
  color: '#F1DAC4',
};

export const wrapperDocsSection: SxProps<Theme> = {
  ...flexRowCenter,
  justifyContent: 'space-between',
  alignItems: 'top',
  background: '#2e3440',
  cursor: 'pointer',
};

export const wrapperNextDocsSection: SxProps<Theme> = {
  width: '30rem',
  transform: 'translateZ(0)', // not applied
  transition: 'opacity 1s', // not applied
  background: '#2e3440',
  border: `1px solid #eee`,
  padding: '0 0.5rem',
};

export const wrapperSubSection: SxProps<Theme> = {
  padding: '0 0.5rem',
};

export const activePoint: SxProps<Theme> = {
  backgroundColor: '#bbb9b9',
  color: '#2e3440', // not applied
};
