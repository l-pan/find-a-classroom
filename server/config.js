const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/find-a-classroom',
  port: process.env.PORT || 9000,
};

export default config;
