import React from 'react';
import { shallow } from 'enzyme';
import { NumberFormatCustomComponent } from './NumberFormatCustom';

describe('Component NumberFormatCustom', () => {
  it('should render without crashing', () => {
    const component = shallow(<NumberFormatCustomComponent />);
    expect(component).toBeTruthy();
  });
});
