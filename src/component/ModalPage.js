import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalPage(props){
  return(

      <Modal size="lg" centered
      show={props.modalShow}
      onHide={()=>props.setModalShow(true)}
      >

        <Modal.Header>
          <Modal.Title>Detail Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Control value={props.dataState.inputNama}
            onChange={(e)=>props.handleInput('inputNama',e)} style={{marginTop: '20px', marginBottom: '20px'}} type="text"
            placeholder="Nama" />
          <Form.Control value={props.dataState.inputJabatan}
            onChange={(e)=>props.handleInput('inputJabatan',e)} type="text"
            placeholder="Jabatan" />
          <Form.Control value={props.dataState.inputJK}
            onChange={(e)=>props.handleInput('inputJK',e)} style={{marginTop: '20px', marginBottom: '20px'}}
            type="text"
            placeholder="Jenis Kelamin" />
          <Form.Control value={props.dataState.inputTgl}
            onChange={(e)=>props.handleInput('inputTgl',e)} type="date"
            placeholder="Tanggal Lahir" />
        </Modal.Body>

        <Modal.Footer>
          <Button
          onClick={()=>props.closeModal()}
          variant="secondary">Close</Button>
          <Button onClick={()=>props.simpanData()} variant="success">Simpan</Button>
        </Modal.Footer>

      </Modal>
  )
}
export default ModalPage;
