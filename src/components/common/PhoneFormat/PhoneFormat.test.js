import React from 'react';
import { shallow } from 'enzyme';
import { PhoneFormatComponent } from './PhoneFormat';

describe('Component PhoneFormat', () => {
  it('should render without crashing', () => {
    const component = shallow(<PhoneFormatComponent />);
    expect(component).toBeTruthy();
  });
});
