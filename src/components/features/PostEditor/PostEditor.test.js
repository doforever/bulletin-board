import React from 'react';
import { shallow } from 'enzyme';
import { PostEditorComponent } from './PostEditor';

describe('Component PostEditor', () => {
  it('should throw without required post arg', () => {
    expect(() => shallow(<PostEditorComponent />)).toThrowError();
  });

  it('should render without crashing when given post arg', () => {
    const post = {
      title: '',
      text: '',
      price: '',
      tel: '',
      address: '',
      photo: '',
    };
    const component = shallow(<PostEditorComponent post={post} />);
    expect(component).toBeTruthy();
  });
});
