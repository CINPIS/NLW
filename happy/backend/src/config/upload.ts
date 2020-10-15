/* Para os Uploads de Imagens */

import multer from 'multer';
/* npm install @types/multer */
import path from 'path';
/* para poder criar os caminhos relativos. */

export default {

    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {

            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
            /* primeiro parametro é nulo pq é erro. callback - docs */
        },
    })
};