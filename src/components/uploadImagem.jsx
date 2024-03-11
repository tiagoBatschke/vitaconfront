import React, { useState } from 'react';
import axios from 'axios';

const UploadImagem = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImagemChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'ml_default'); // Substitua 'seu_upload_preset' pelo seu upload preset do Cloudinary

    axios.post('https://api.cloudinary.com/v1_1/daivrbh3k/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
  
      // Aqui você pode lidar com a resposta do upload, como exibir a imagem enviada
    })
    .catch(error => {
      console.error('Erro ao fazer upload da imagem:', error);
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImagemChange} />
      <button onClick={handleUpload}>Enviar Imagem</button>
    </div>
  );
};

export default UploadImagem;