import express from 'express';
import graphqlHTTP from 'express-graphql';

import { BabyNamesSchema } from './schema';

const app = express();
export default app;

app.use('/graphql', graphqlHTTP({
  schema: BabyNamesSchema,
  graphiql: false
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
