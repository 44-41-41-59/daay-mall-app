import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addStore } from '../../store/actions/store';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { handleUpload } from '../../store/actions/files';
// import Image from '../imagetest/index';



function ApplyStore(props) {
  const [modal, setModal] = useState(false);
  const [images, setImage] = useState({});

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files);
    }
  };
  const handleUpload = () => {
    props.handleUpload('storeLogo', images);
  };

  let submitFormHandler = (e) => {
    e.preventDefault();
    props.addStore(e.target, props.images);
    setModal(true);
  };
  let hideModal = () => {
    setModal(false);
  };

  return (
    <div>
      <form
        onSubmit={submitFormHandler}
        id='store-apply-form'
        style={{ display: 'flex', flexDirection: 'column' }
        }>
        <label for='name'>
          Store name
          <input type='text' name='name' />
        </label>
        <label for='logo'>
          Store logo
          <input type='file' onChange={handleChange}/> {/*should be only one image*/}
          <div onClick={handleUpload} style={{backgroundColor:'gray'}}>Upload</div> {/* Dont make it a button!! */}
        </label>
        <label for='categories'>
          Categories
          <select name="category" id="categories">
            <option value="general">General</option>
            <option value="food">food</option>
          </select>
        </label>
        <label for='country'>
          Country
          <input type='text' name='country' /> {/*make it a dropdown list*/}
        </label>
        <label for='city'>
          City
          <input type='text' name='city' />
        </label>
        <label for='contactNumber'>
          Contact number
          <input type='number' name='contactNumber' />
        </label>
        <input type='hidden' value={props.user._id} name='ownerID' />
        <button type='submit'>Apply store</button>
      </form>

      <Modal  show={modal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Store created successfully.</p> {/*if statement for the failed case*/}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>Ok</Button>
        </Modal.Footer>
      </Modal>

    </div>

  );
}

const mapStateToProps = (state) => {
  console.log('??????????????///', state.files);
  return { user: state.user, images:state.files.images };
};

const mapDispatchToProps = (dispatch) => ({
  addStore: (target, logo) => dispatch(addStore(target, logo)),
  handleUpload: (spaceName, images) =>
    dispatch(handleUpload(spaceName, images)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ApplyStore);
// name: '',
// logo: '',
// category: ['general', 'food'],
// closing: { type: String },
// opening: { type: String },
// images: { type: Array },
// products: {type: Array},
// products: [product],
// status:   type: String,  default: 'pending', enum: ['pending', 'rejected', 'approved'],
// country: { type: String, toLowerCase: true, required: true },
// city: { type: String, toLowerCase: true, required: true },
// contactNumber: { type: Number, required: true },
// ownerID: { type: String, required: true },