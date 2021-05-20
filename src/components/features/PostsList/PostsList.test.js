import React from 'react';
import { shallow } from 'enzyme';
import { PostsListComponent } from './PostsList';

describe('Component PostsList', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostsListComponent />);
    expect(component).toBeTruthy();
  });
});
