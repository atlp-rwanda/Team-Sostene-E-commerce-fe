import { useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './uploadMultiple.module.scss';
import { ImageInterf } from '../addProductToCollection/addProduct.slice';

export interface PropsInter {
  formik: any;
  setImages: any;
  images: ImageInterf[] | [];
}

export default function UploadMultiple(props: PropsInter) {
  const { formik, images, setImages } = props;
  const refUpload = useRef<HTMLDivElement>(null);

  const onDrop = (acceptedFiles: Blob[] | MediaSource[]) => {
    const updatedImages = [...images];
    acceptedFiles.forEach((file: Blob | MediaSource) => {
      const blobUrl = URL.createObjectURL(file);
      updatedImages.push({
        url: blobUrl,
        file,
      });
    });
    setImages(updatedImages);
  };

  useEffect(() => {
    formik.setFieldValue('image', [...images]);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteImage = (url: string) => {
    const remainImages = images.filter((image: ImageInterf) => image.url !== url);
    setImages([...remainImages]);
  };

  return (
    <div className={styles.multipleUpload}>
      <div
        {...getRootProps()}
        className={isDragActive ? ' dragable drag-active ' : ' dragable drag-inactive'}
      >
        <div className="uploadBox" ref={refUpload} role="hidenClick">
          <img src="/svgs/image.svg" alt="Icon" className="iconi" />
        </div>
        <input
          {...getInputProps()}
          multiple
          accept="image/*"
          onClick={() => refUpload?.current?.click()}
          data-testid="uploadonDrag"
        />
        <div className="details">
          <p>Drag and drop some product images here, or click to select images</p>
          <small>Images must not be less than 4 and not greater than 8</small>
        </div>
      </div>
      {images && (
        <div className="imageWraper">
          {images.map((image, index) => (
            <div
              key={index}
              className="singleImg"
              style={{ backgroundImage: `url("${image.url}")` }}
            >
              <span
                className="deletebtn"
                role="deleteBtn"
                onClick={() => handleDeleteImage(image.url)}
              >
                <img src="/svgs/closeBtn.svg" alt="Icon" className="icon" />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
