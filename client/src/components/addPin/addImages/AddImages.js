import { Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagesList from './ImagesList';
import ProgressList from './progressList/ProgressList';

const AddImages = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '5px dashed #ccc', // Tăng độ rộng của nét đứt
          '&:hover': { border: '5px dashed #ccc' }, // Đổi kiểu viền khi hover
          padding: '16px', // Thêm padding để nội dung bên trong không chạm vào viền
        }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: 'green' }}>Drop the files here...</p>
          ) : (
            <p>(¬_¬)</p>
          )}
          <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>
        </div>
      </Paper>
      <ProgressList {...{ files }} />
      <ImagesList />
    </>
  );
};

export default AddImages;
