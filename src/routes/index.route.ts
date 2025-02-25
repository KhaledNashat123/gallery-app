import { Router } from 'express';
import { addPhoto, Photo } from '../models/photo.model';
import multer from 'multer';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const photos = await Photo.find();
    
        /** @TODO Render Existing Photos in index.ejs */
        res.render('index', { photos });
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.post(
    '/',
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        })
    }).single("file"),
    async (req, res, next) => {
        try {
            console.log(req.file)
            
            const photoData = new Photo({   
                path: req.file?.path || "", 
                title: req.body.title || "Untitled"
            });
            
            await addPhoto(photoData);
            res.redirect('/');

        } catch (err) {
            console.error(err);
            next(err)
        }
    }
)

export default router;