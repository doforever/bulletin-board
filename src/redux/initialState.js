export const initialState = {
  posts: {
    data: [
      {
        id: '1',
        title: 'Boat for sale',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-20',
        lastUpdate: '2021-05-20',
        email: 'joanna.doe@gmail.com',
        status: 'published',
        price: '40 $',
        photo: '/images/boat.jpeg',
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
        photo: '/images/house.jpeg',

      },
      {
        id: '3',
        title: 'Developer looking for a job',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In felis.',
        published: '2021-04-19',
        lastUpdate: '2021-05-20',
        email: 'adam.doe@gmail.com',
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
