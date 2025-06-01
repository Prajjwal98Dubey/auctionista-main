import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const addProductImages = async (images) => {
  let imagesCollection = [];
  images.forEach((image) => {
    const imageRef = ref(
      storage,
      `auction/products/${image.file.name.split(".")[0] + "-" + Date.now()}`
    );
    imagesCollection.push(
      uploadBytes(imageRef, image.file)
        .then(() => getDownloadURL(imageRef))
        .catch((err) => console.log(err))
    );
  });
  let uploadedImagesCollection = await Promise.all(imagesCollection);
  alert("images uploaded.");
  return uploadedImagesCollection;
};

export const addUserImage = async (file) => {
  const imageRef = ref(
    storage,
    `auction/users/${file.name.split(".")[0] + "-" + Date.now()}`
  );
  try {
    await uploadBytes(imageRef, file);
    let url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.log(error);
  }
};
