import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const mockRequest = {
      active: false,
      error: false,
    };

    const component = shallow(<PostEditComponent postRequest={mockRequest}/>);
    expect(component).toBeTruthy();
  });
});
