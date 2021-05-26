import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtonComponent } from './ActionButton';

describe('Component ActionButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<ActionButtonComponent />);
    expect(component).toBeTruthy();
  });
});
