export const initialState = {
  posts: {
    data: [
      {
        id: '1',
        title: 'Boat for sale',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-20T08:53:14.221Z',
        lastModified: '2021-05-20T08:53:14.221Z',
        email: 'jon.doe@gmail.com',
        status: 'published',
        price: '40 $',
        photo: 'https://www.pexels.com/photo/bearded-mechanic-working-with-metal-part-near-boat-3823220/',
      },
      {
        id: '2',
        title: 'House for rent',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-21T08:53:14.221Z',
        lastModified: '2021-05-20T08:53:14.221Z',
        email: 'jon.doe@gmail.com',
        status: 'published',
        tel: '123456789',
        address: 'Zawada',

      },
      {
        id: '3',
        title: 'Developer looking for a job',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-19T08:53:14.221Z',
        lastModified: '2021-05-20T08:53:14.221Z',
        email: 'jon.doe@gmail.com',
        status: 'published',
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  user: null,
};
