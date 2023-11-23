/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@mui/material';

import { changeImage } from '@pages/Settings/actions';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css";

import classes from "./style.module.scss";
import "./react-cropper.css"

const ChangeImage = ({ openImage, handleCloseImage, token }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const cropperRef = createRef();
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    // Check if the selected file is an image
    if (selectedFile && selectedFile.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
    } else {
      setImage(null);
      setError('Please select a valid image file (jpg, jpeg, png, gif, etc.)');
    }
  };

  const getRoundedCanvas = (sourceCanvas) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const { width, height } = sourceCanvas;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      const roundedCanvas = getRoundedCanvas(croppedCanvas);

      return roundedCanvas;
    }
  }

  const handleClose = () => handleCloseImage();

  const handleSave = () => {
    setError("");

    const roundedCanvas = getCropData();

    roundedCanvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'cropped.png');

      dispatch(changeImage(token, formData, handleClose));
    })
  };

  useEffect(() => {
    setError("");
    setImage(null);
  }, [openImage]);
  
  return (
    <Dialog open={openImage} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h2>Change Image Profile</h2>
          <div className={classes["image-upload-container"]}>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button variant='contained' className={classes.btn}>
              <label htmlFor="file-input">
                Choose File
              </label>
            </Button>
            {image && (
              <div className={classes.after_choose}>
                <div className={classes.helper}>
                  Move (by drag) and resize (by scroll) to customize the cropping
                </div>
                <Cropper
                  ref={cropperRef}
                  className={classes.cropper}
                  dragMode="move"
                  aspectRatio={1}
                  autoCropArea={0.65}
                  restore={false}
                  guides={false}
                  highlight={false}
                  viewMode={1}
                  cropBoxMovable={false}
                  cropBoxResizable={false}
                  toggleDragModeOnDblclick={false}
                  src={image}
                  responsive
                />
              </div>
            )}
          </div>
          {/* eslint-disable-next-line react/button-has-type */}
          {error && (<p className={classes.error}>{error}</p>)}
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' className={classes.save} onClick={handleSave}>Upload</Button>
        </div>
      </div>
    </Dialog>
  )
};

ChangeImage.propTypes = {
  openImage: PropTypes.bool.isRequired,
  handleCloseImage: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default ChangeImage;
