import { app } from './app';
import { runDatabase } from './database';

const PORT = process.env.PORT || 3500;

app.listen(PORT, async () => {
    await runDatabase();
    console.log(`Server is listening on port ${PORT}`);
});
