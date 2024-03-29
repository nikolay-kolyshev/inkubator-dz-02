/// required first import
import 'dotenv/config';
/////////////////////////////
import { app } from './app';
import { runDatabase } from './database';
import { settings } from './settings';

const PORT = settings.port || 3500;

app.listen(PORT, async () => {
    await runDatabase();
    console.info(`Server is listening on port ${PORT}`);
});
