import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import ModalPage from './ModalPage'


class Body extends Component{
  constructor(props){
    super(props)
    this.state={
      dataKaryawan:[],
      valueSearch: "",
      inputNama:'',
      inputJabatan:'',
      inputJK:'',
      inputTgl:'',
      idInput:''

    }
    this.panggilSemua = this.panggilSemua.bind(this)
    this.search = this.search.bind(this)
    this.hapusData = this.hapusData.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.clearInput = this.clearInput.bind(this)
    this.simpanData = this.simpanData.bind(this)
    this.panggilById = this.panggilById.bind(this)

  }



  panggilById(id){
    // console.log(id)
    fetch(`http://localhost:3000/data-karyawan/${id}`)
        .then((response)=>response.json())
        .then((hasil=>{
          this.props.setModalShow(true)
          // console.log(hasil)
          this.setState(
            {
            inputNama: hasil.nama_karyawan,
            inputJabatan: hasil.jabatan,
            inputJK: hasil.jenis_kelamin,
            inputTgl: hasil.tanggal_lahir,
            idInput: hasil.id
            }
          )
        }))
  }




  simpanData(){
    if (this.state.inputNama ==="" || this.state.inputJabatan
    === "" || this.state.inputJK === "" || this.state.inputTgl ==="" ){

      alert("Silahkan isi data terlebih dahulu")
    }else if(this.state.idInput ===""){
      fetch('http://localhost:3000/data-karyawan', {

        method: 'POST',
        body: JSON.stringify({
          nama_karyawan: this.state.inputNama,
          jabatan: this.state.inputJabatan,
          jenis_kelamin: this.state.inputJK,
          tanggal_lahir: this.state.inputTgl,
        }),
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response)=>response.json())
          .then((result=>{
            this.closeModal()
            this.panggilSemua()
            // console.log(result)
          }))
        }else{
          // console.log("Perintah Untuk Edit akan ditulis di sini");
          fetch(`http://localhost:3000/data-karyawan/${this.state.idInput}`,{
            method: 'PUT',
            body: JSON.stringify({
              nama_karyawan: this.state.inputNama,
              jabatan: this.state.inputJabatan,
              jenis_kelamin: this.state.inputJK,
              tanggal_lahir: this.state.inputTgl,
          }),
          headers:{
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((response)=>response.json())
            .then((hasil=>{
              this.panggilSemua();
              this.props.setModalShow(false);
              this.clearInput();
            }))
          }
        }



  handleInput(value, e){
    // console.log(e.target.value)
    this.setState({[value]: e.target.value})
  }




  closeModal(){
    // console.log("close modal")
      this.props.setModalShow(false)
      this.clearInput()
  }


  clearInput(){
    this.setState(
      {
        inputNama:'',
        inputJabatan:'',
        inputJK:'',
        inputTgl:'',
        idInput:''
    })
  }



  hapusData(id){
    // console.log(id)
    fetch(`http://localhost:3000/data-karyawan/${id}`, {
        method: 'DELETE',
      }).then((response=>{
        alert('Data Sudah Terhapus')
        this.panggilSemua()
      }))
  }


  search(e){
    this.setState({valueSearch: e.target.value})
  }


  panggilSemua(){
  fetch(`http://localhost:3000/data-karyawan`)
      .then((response)=> response.json())
      .then((hasil)=> this.setState({dataKaryawan: hasil}))

  }


  componentDidMount(){
    this.panggilSemua()
  }
  render(){
    return(
      <>
        <Alert variant="success"><h3><center>Data Karyawan</center></h3></Alert>

          <Container>

          <ModalPage
          modalShow={this.props.modalShow}
          setModalShow={this.props.setModalShow}
          closeModal={this.closeModal}
          dataState={this.state}
          handleInput={this.handleInput}
          simpanData={this.simpanData}
           />


          <Row style={{marginTop: '30px'}}>
            <Col lg ={10}>
              <Form.Control type="text" placeholder="Cari data berdasarkan nama karyawan"
              value={this.state.valueSearch} onChange={(e)=>this.search(e)} />
            </Col>

            <Col lg={2}>
              <Button  onClick={()=>this.props.setModalShow(true)}
              varian="primary">Tambah Data</Button>
            </Col>
          </Row>

          <Row>
                {
                  this.state.dataKaryawan.reverse().filter(valueFilter =>
                    valueFilter.nama_karyawan.toLowerCase().includes(this.state.valueSearch.toLowerCase())).map((value, index)=>{
                    return(
                      <Card style={{ width:'200px', marginTop:'30px', marginLeft:'20px'}} key={index}>
                        <Card.Img variant="Top" src="" />
                        <Card.Body>
                          <Card.Title>{value.nama_karyawan}</Card.Title>
                          <Card.Text>{value.jabatan}</Card.Text>
                          <Card.Text>{value.jenis_kelamin}</Card.Text>
                          <Card.Text>{value.tanggal_lahir}</Card.Text>
                        </Card.Body>

                        <Card.Footer>
                          <Button onClick={()=>this.hapusData(value.id)}  style={{marginRight: '5%'}} variant="outline-danger">Hapus</Button>
                          <Button onClick={()=>this.panggilById(value.id)} variant="outline-primary">Edit</Button>
                        </Card.Footer>
                      </Card>
                    )
                  })
              }
          </Row>


          </Container>
      </>
    )
  }
}
export default Body;
