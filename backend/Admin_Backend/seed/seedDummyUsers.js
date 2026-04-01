const seedUsers = async () => {
  const users = [
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      status: 'offline',
      location: 'Punjab',
      subscription: 'Premium',
      lastActive: null
    },
    {
      name: 'Alice',
      email: 'alice@example.com',
      status: 'offline',
      location: 'Mumbai',
      subscription: 'Free',
      lastActive: null
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      status: 'online',
      location: 'Delhi',
      subscription: 'Premium',
      lastActive: null
    }
  ];

  for (const user of users) {
    const exists = await DummyUser.findOne({ email: user.email });
    if (!exists) {
      await DummyUser.create(user);
      console.log(`Inserted user: ${user.name}`);
    }
  }
};
