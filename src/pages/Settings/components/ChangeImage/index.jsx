/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@mui/material';

import { changeImage } from '@pages/Settings/actions';
import classes from "./style.module.scss";

const ChangeImage = ({ openImage, handleCloseImage, token }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    // Check if the selected file is an image
    if (selectedFile && selectedFile.type.includes('image')) {
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    } else {
      setImage(null);
      setPreview(null);
      setError('Please select a valid image file (jpg, jpeg, png, gif, etc.)');
    }
  };

  const validateImage = () => {
    return true;
  }

  const handleClose = () => handleCloseImage();

  const handleSave = () => {
    setError("");

    // eslint-disable-next-line no-useless-return
    if (!validateImage()) return;

    const formData = new FormData();
    formData.append('image', image);

    dispatch(changeImage(token, formData, handleClose));
  };

  useEffect(() => {
    setError("");
    setImage(null);
    setPreview(null);
  }, [openImage]);
  
  return (
    <Dialog open={openImage} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h2>Change Image Profile</h2>
          <div className={classes["image-upload-container"]}>
            {preview && (
              <div className={classes.image}>
                <img src={preview} alt="Preview" />
              </div>
            )}
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button variant='contained'>
              <label htmlFor="file-input">
                Choose File
              </label>
            </Button>
          </div>
          {/* eslint-disable-next-line react/button-has-type */}
          {error && (<p className={classes.error}>{error}</p>)}
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' className={classes.save} onClick={handleSave}>Save</Button>
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
