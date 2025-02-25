import mongoose, { Document } from "mongoose";

export interface PhotoDocument extends Document {
    path: string,
    title?: string
}

const photoSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    title: String
})

export const Photo = mongoose.model<PhotoDocument>("Photo", photoSchema);


export const addPhoto = async (photo: PhotoDocument) => {
    try {
        let newPhoto = new Photo(photo); 
        await newPhoto.save();
    } catch (error) {
        throw error;
    }
};