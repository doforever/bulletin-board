const Post = require('./models/post.model');
const { imagesURL } = require('./config');

const loadInitialData = async () => {
  const today = new Date();
  const data = [
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'House for sale',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. Nulla euismod quam ligula, tincidunt laoreet sapien commodo eu. Nunc sagittis luctus risus, sit amet aliquet sem tincidunt a. Fusce et odio porta, sollicitudin ante a, feugiat eros. Etiam neque diam, ultricies eu eros eget, molestie volutpat sapien. Integer tincidunt ligula leo, nec finibus nulla faucibus in. Pellentesque arcu massa, imperdiet vel laoreet eget, efficitur vel purus. Cras convallis aliquam libero, vel sagittis mi vestibulum eu. Praesent sodales molestie efficitur. Aenean consectetur dignissim porta. Nam ligula eros, semper vitae.',
      photo: `${imagesURL}/initial/house.jpeg`,
      price: 1000,
      phone: '12345678901',
      location: '60 Somewhere St',
      created: today,
      updated: today,
    },
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'Vintage bike',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. Nulla euismod quam ligula, tincidunt laoreet sapien commodo eu. Nunc sagittis luctus risus, sit amet aliquet sem tincidunt a. Fusce et odio porta, sollicitudin ante a, feugiat eros. Etiam neque diam, ultricies eu eros eget, molestie volutpat sapien. Integer tincidunt ligula leo, nec finibus nulla faucibus in. Pellentesque arcu massa, imperdiet vel laoreet eget, efficitur vel purus. Cras convallis aliquam libero, vel sagittis mi vestibulum eu. Praesent sodales molestie efficitur. Aenean consectetur dignissim porta. Nam ligula eros, semper vitae.',
      photo: `${imagesURL}/initial/bike.jpeg`,
      price: 20,
      phone: '12345678901',
      location: '20 Somewhere St',
      created: today,
      updated: today,
    },
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'Flat for rent',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. Nulla euismod quam ligula, tincidunt laoreet sapien commodo eu. Nunc sagittis luctus risus, sit amet aliquet sem tincidunt a. Fusce et odio porta, sollicitudin ante a, feugiat eros. Etiam neque diam, ultricies eu eros eget, molestie volutpat sapien. Integer tincidunt ligula leo, nec finibus nulla faucibus in. Pellentesque arcu massa, imperdiet vel laoreet eget, efficitur vel purus. Cras convallis aliquam libero, vel sagittis mi vestibulum eu. Praesent sodales molestie efficitur. Aenean consectetur dignissim porta. Nam ligula eros, semper vitae.',
      photo: `${imagesURL}/initial/flat.jpeg`,
      price: 100,
      phone: '12345678901',
      location: '30 Somewhere St',
      created: today,
      updated: today,
    },
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'Garage sale',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. Nulla euismod quam ligula, tincidunt laoreet sapien commodo eu. Nunc sagittis luctus risus, sit amet aliquet sem tincidunt a. Fusce et odio porta, sollicitudin ante a, feugiat eros. Etiam neque diam, ultricies eu eros eget, molestie volutpat sapien. Integer tincidunt ligula leo, nec finibus nulla faucibus in. Pellentesque arcu massa, imperdiet vel laoreet eget, efficitur vel purus. Cras convallis aliquam libero, vel sagittis mi vestibulum eu. Praesent sodales molestie efficitur. Aenean consectetur dignissim porta. Nam ligula eros, semper vitae.',
      photo: `${imagesURL}/initial/sale.jpeg`,
      phone: '12345678901',
      location: '60 Somewhere St',
      created: today,
      updated: today,
    },
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'Job offer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. Nulla euismod quam ligula, tincidunt laoreet sapien commodo eu. Nunc sagittis luctus risus, sit amet aliquet sem tincidunt a. Fusce et odio porta, sollicitudin ante a, feugiat eros. Etiam neque diam, ultricies eu eros eget, molestie volutpat sapien. Integer tincidunt ligula leo, nec finibus nulla faucibus in. Pellentesque arcu massa, imperdiet vel laoreet eget, efficitur vel purus. Cras convallis aliquam libero, vel sagittis mi vestibulum eu. Praesent sodales molestie efficitur. Aenean consectetur dignissim porta. Nam ligula eros, semper vitae.',
      photo: `${imagesURL}/initial/job.jpeg`,
      phone: '12345678901',
      created: today,
      updated: today,
    },
    {
      author: 'user123@example.com',
      status: 'published',
      title: 'Fresh fruits',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque ornare nibh eget tincidunt. Aenean ut consectetur erat, ut fringilla nibh. Nulla euismod quam ligula, tincidunt laoreet sapien commodo eu. Nunc sagittis luctus risus, sit amet aliquet sem tincidunt a. Fusce et odio porta, sollicitudin ante a, feugiat eros. Etiam neque diam, ultricies eu eros eget, molestie volutpat sapien. Integer tincidunt ligula leo, nec finibus nulla faucibus in. Pellentesque arcu massa, imperdiet vel laoreet eget, efficitur vel purus. Cras convallis aliquam libero, vel sagittis mi vestibulum eu. Praesent sodales molestie efficitur. Aenean consectetur dignissim porta. Nam ligula eros, semper vitae.',
      photo: `${imagesURL}/initial/fruits.jpeg`,
      price: 30,
      phone: '12345678901',
      location: '30 Somewhere St',
      created: today,
      updated: today,
    },
  ];

  const multiplyData = (data, factor) => {
    const result = [];
    for (let i = 1; i <= factor; i++) {
      result.push(...(data.map(item => ({
        ...item,
        title: item.title + ' ' + i,
        created: item.created.setDate(i),
        updated: item.updated.setDate(i),
      }))));
    }
    return result;
  };

  try {
    await Post.deleteMany();
    console.log('DB cleared. Loading example data...');
    await Post.create(multiplyData(data, 3));
    console.log('Test data has been successfully loaded');
  } catch (err) {
    console.log(`Couldn't load test data`, err);
  }

};

module.exports = loadInitialData;
