import { app } from './app';
import { runDatabase } from './database';
import { settings } from './settings';

const PORT = settings.port || 3500;

app.listen(PORT, async () => {
    await runDatabase();
    console.log(`Server is listening on port ${PORT}`);
});
