import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const mockRequest = {
      active: false,
      error: false,
    };

    const component = shallow(<HomepageComponent postsRequest={mockRequest}/>);
    expect(component).toBeTruthy();
  });
});
