import cloudinary from "../config/cloudinary.config";

export const imageUpload = async (req) => {
  let imageUrl = "";
  await cloudinary.uploader.upload(req.file.path, async (err, image) => {
    if (err) {
      throw new Error(err);
    }
    imageUrl = image.url;
  });
  return imageUrl;
};
