import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent />);
    expect(component).toBeTruthy();
  });
});
