import userRouter from './userRoute';

import assignmentRouter from './assignmentRoute';
import coursesRouter from './coursesRoute';
import coursesUserRouter from './courseUserRouter';
import availableTASlotRouter from './teachingAssistantSlotRoute';
import bookingRouter from './bookingRoute';

//setting default route
const routes = (app) => {
  app.get('/ping', (req, res) => res.send('poing'));
  app.use('/courses/user', coursesUserRouter);
  app.use('/courses', coursesRouter);
  app.use('/user', userRouter);
  app.use('/user/assignment', assignmentRouter);
  app.use('/slot', availableTASlotRouter);
  app.use('/booking', bookingRouter);
};

export default routes;
