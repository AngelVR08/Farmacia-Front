import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../atoms/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
const url = import.meta.env.VITE_URL_API;
const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [formula, setFormula] = useState('');
  const [secundaryEffects, setSecundaryEffects] = useState('');
  const [caducity, setCaducity] = useState('');
  const [dose, setDose] = useState('');
  const [uso, setUso] = useState('');
  const [createdBy, setCreatedBy] = useState('jose'); // Ejemplo de valor

  const navigate = useNavigate(); // Hook para navegar

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Error: Usuario no autenticado');
      navigate('/login');
      return;
    }

    const formdata = new FormData();
    formdata.append("stock", productQuantity);
    formdata.append("name", productName);
    formdata.append("price", productPrice);
    formdata.append("description", productDescription);
    if (productImage) {
      formdata.append("img", productImage); // Enviar el archivo directamente
    }
    formdata.append("type", productCategory);
    formdata.append("formula", formula);
    formdata.append("secundary_effects", secundaryEffects);
    formdata.append("caducity", caducity);
    formdata.append("dose", dose);
    formdata.append("uso", uso);
    formdata.append("created_by", createdBy); // Asegúrate de incluir este campo

    fetch(`${url}product/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formdata,
      redirect: "follow"
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            alert('Unauthorized: Please check your token');
            navigate('/login');
            return;
          }
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then((result) => {
        alert('Producto agregado con éxito');
        console.log(result);
      })
      .catch(error => {
        alert('Error al agregar el producto: ' + error.message);
        console.error(error);
      });
  };

  return (
    <div className="admin-form">
      <Title>Agregar Producto</Title>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <Label htmlFor="productName">Nombre:</Label>
          <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Nombre del producto" required />
        </div>
        <div className="form-row">
          <Label htmlFor="productPrice">Precio:</Label>
          <Input id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Precio del producto" required />
        </div>
        <div className="form-row">
          <Label htmlFor="productDescription">Descripción:</Label>
          <Input id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Descripción del producto" required />
        </div>
        <div className="form-row">
          <Label htmlFor="productQuantity">Cantidad Disponible:</Label>
          <Input id="productQuantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} placeholder="Cantidad disponible" required />
        </div>
        <div className="form-row">
          <Label htmlFor="productCategory">Clasificación:</Label>
          <Input id="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} placeholder="Clasificación del producto" required />
        </div>
        <div className="form-row">
          <Label htmlFor="formula">Fórmula:</Label>
          <Input id="formula" value={formula} onChange={(e) => setFormula(e.target.value)} placeholder="Fórmula del producto" required />
        </div>
        <div className="form-row">
          <Label htmlFor="secundaryEffects">Efectos Secundarios:</Label>
          <Input id="secundaryEffects" value={secundaryEffects} onChange={(e) => setSecundaryEffects(e.target.value)} placeholder="Efectos secundarios" required />
        </div>
        <div className="form-row">
          <Label htmlFor="caducity">Caducidad:</Label>
          <Input id="caducity" value={caducity} onChange={(e) => setCaducity(e.target.value)} placeholder="Caducidad" required />
        </div>
        <div className="form-row">
          <Label htmlFor="dose">Dosis:</Label>
          <Input id="dose" value={dose} onChange={(e) => setDose(e.target.value)} placeholder="Dosis" required />
        </div>
        <div className="form-row">
          <Label htmlFor="uso">Uso:</Label>
          <Input id="uso" value={uso} onChange={(e) => setUso(e.target.value)} placeholder="Uso del producto" required />
        </div>
        <div className="form-row">
          <Label htmlFor="productImage">Imagen:</Label>
          <Input type="file" id="productImage" onChange={handleImageChange} required />
        </div>
        <Button type="submit">Agregar Producto</Button>
      </form>
    </div>
  );
};

export default AddProductForm;
