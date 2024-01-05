import { render, screen, fireEvent } from '@testing-library/react';
import { test } from 'vitest';
import CustomTabPanel from './CustomTabPanel';

test('renders CustomTabPanel component and interacts with tabs', () => {
  const tabsLabels = ['Tab 1', 'Tab 2'];
  const tabsPanels = [
    <div key="1">Content 1</div>,
    <div key="2">Content 2</div>,
  ];

  render(<CustomTabPanel tabsLabels={tabsLabels} tabsPanels={tabsPanels} />);

  tabsLabels.forEach((label) => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(tabsLabels[1]));

  expect(screen.getByText('Content 2')).toBeInTheDocument();
});
