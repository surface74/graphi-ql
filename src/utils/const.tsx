import UIStrings from '../assets/UIStrings.json';

import VariablesEditor from '../Components/VariablesEditor/VariablesEditor';
import HeadersEditor from '../Components/HeadersEditor/HeadersEditor';

export const tabsLabels = {
  Ru: [UIStrings.Variables.Ru, UIStrings.Headers.Ru],
  En: [UIStrings.Variables.En, UIStrings.Headers.En],
};

export const tabs = [
  <VariablesEditor key="variablesEditor" />,
  <HeadersEditor key="headersEditor" />,
];

export const ignoreSimbols = /[\{\}\[\]\(\):]/g;
