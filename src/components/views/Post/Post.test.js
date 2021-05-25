import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const mockRequest = {
      active: false,
      error: false,
    };

    const component = shallow(<PostComponent postRequest={mockRequest}/>);
    expect(component).toBeTruthy();
  });
});
