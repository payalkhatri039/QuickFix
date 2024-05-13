import app from './api/app';
import config from './config/index';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
