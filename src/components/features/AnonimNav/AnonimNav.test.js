import React from 'react';
import { shallow } from 'enzyme';
import { AnonimNavComponent } from './AnonimNav';

describe('Component AnonimNav', () => {
  it('should render without crashing', () => {
    const component = shallow(<AnonimNavComponent />);
    expect(component).toBeTruthy();
  });
});
