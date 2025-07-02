import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../config/cloudinaryConfig";
export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  // Lắng nghe dữ liệu thay đổi trong thời gian thực
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Gọi callback với dữ liệu mới nhất
    callback(documents);
  });

  // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
  return unsubscribe;
};

export const addDocument = async (collectionName, values) => {
  try {
    if (values.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
      values.imgUrl = imgUrl;
    }

    const docRef = await addDoc(collection(db, collectionName), values);
    
    // Trả về object vừa thêm, kèm id
    return {
      id: docRef.id,
      ...values,
    };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Update a document in a given collection with an optional image upload
export const updateDocument = async (collectionName, values) => {
  const { id, ...updated } = values;
  try {
    if (values.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(values.imgUrl,collectionName);
      values.imgUrl = imgUrl;
    }

    await updateDoc(doc(collection(db, collectionName), id), updated);
    // Delete the old image if it exists
    // Xóa ảnh trên Cloudinary nếu tồn tại
    if (values.oldImgUrl && values.oldImgUrl.includes('cloudinary.com')) {
      // Lấy `public_id` từ URL của Cloudinary
      const publicId = values.oldImgUrl
        .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
        .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
      await deleteImageFromCloudinary(publicId);
    }
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, values) => {
  try {
    // Xóa tài liệu khỏi Firestore
    await deleteDoc(doc(collection(db, collectionName), values.id));
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};
