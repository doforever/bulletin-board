import React from 'react';
import { shallow } from 'enzyme';
import { MyPostsComponent } from './MyPosts';

describe('Component MyPosts', () => {
  it('should render without crashing', () => {
    const mockRequest = {
      active: false,
      error: false,
    };

    const component = shallow(<MyPostsComponent postsRequest={mockRequest} />);
    expect(component).toBeTruthy();
  });
});
