export const initialState = {
  posts: {
    data: [
      {
        id: '1',
        title: 'Boat for sale',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-20',
        lastUpdate: '2021-05-20',
        email: 'jon.doe@gmail.com',
        status: 'published',
        price: '40 $',
        photo: 'https://images.pexels.com/photos/3823220/pexels-photo-3823220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        id: '2',
        title: 'House for rent',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-21',
        lastUpdate: '2021-05-20',
        email: 'jon.doe@gmail.com',
        status: 'published',
        tel: '123456789',
        address: 'Zawada',
        photo: 'https://images.pexels.com/photos/3330118/pexels-photo-3330118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',

      },
      {
        id: '3',
        title: 'Developer looking for a job',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-19',
        lastUpdate: '2021-05-20',
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
