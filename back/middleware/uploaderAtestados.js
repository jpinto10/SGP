const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            debugger
            cb(null, '../projeto_Portal_Back/public/atestados')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)  
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'].find(formatoAceito => formatoAceito == file.mimetype);

        if(extensaoImg){
            return cb(null, true);
        }

        return cb(null, false);
    }
}));
