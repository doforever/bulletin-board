import React from 'react';
import { shallow } from 'enzyme';
import { UserNavComponent } from './UserNav';

describe('Component UserNav', () => {
  it('should render without crashing', () => {
    const component = shallow(<UserNavComponent />);
    expect(component).toBeTruthy();
  });
});
