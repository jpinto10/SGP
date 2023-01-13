const multer = require('multer');
// const upload = multer({dest: 'fotos/'})

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../projeto_Portal_Back/public/fotos_user')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)  
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


// const multer = require('multer');
// const parser = multer({ dest: 'public/uploads/' })

// module.exports = async (req, res) => {
//     parser.single('avatar')(req, res, err => {
//         if (err)
//             res.status(500).json({ error: 1, payload: err });
//         else {
//             const image = {};
//             image.id = req.file.filename;
//             image.url = `/uploads/${image.id}`;
//             res.status(200).json({ error: 0, payload: { id: image.id, url: image.url } });
//         }
//     });
// }