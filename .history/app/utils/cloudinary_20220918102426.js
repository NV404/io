import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(fileStream) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "logos",
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );

    fileStream.pipe(uploadStream);
  });
}

const formData = await unstable_parseMultipartFormData(
  request,
  async function ({ stream, name, filename, ...otherProps }) {
    if (name === "logo" && filename) {
      const uploadedImage = await uploadImage(stream);

      return uploadedImage.secure_url;
    }
                      
    stream.resume();
  }
);
