import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { Product } from '../../types/Product';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ProductService } from '../../services/ProductService';

type ProductModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  prod: Product;
  onDelete: (product: Product) => void;
  onSaveUpdate: (product: Product) => void;
};

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  prod,
  onDelete,
  onSaveUpdate,
}: ProductModalProps) => {
  const handleSaveUpdate = async (pro: Product) => {
    try {
      const isNew = pro.id === 0;
      await onSaveUpdate(pro); // Llama a la función onSaveUpdate con el producto para crear o actualizar
      toast.success(isNew ? 'Producto Creado' : 'Producto Actualizado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }
  };

  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(prod.id);
      toast.success("Producto Borrado", {
        position: "top-center",
      });

      // Una vez que la eliminación es exitosa, actualiza los datos
      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      console.error('A ocurrido un Error');
    }
  };

  const validationSchema = Yup.object().shape({
    id: Yup.number().integer().min(0),
    title: Yup.string().required('El título es requerido'),
    price: Yup.number().min(0).required('El precio es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    category: Yup.string().required('La categoría es requerida'),
    image: Yup.string().required('La URL de la imagen es requerida'),
  });

  const formik = useFormik({
    initialValues: prod,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Product) => handleSaveUpdate(obj),
  });

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Está seguro que desea eliminar el Producto?
              <br /> <strong>{prod.title}</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.title && formik.touched.title)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.price && formik.touched.price)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.description && formik.touched.description)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  name="category"
                  type="text"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.category && formik.touched.category)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  name="image"
                  type="text"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.image && formik.touched.image)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer className="mt-4">
                <Button variant="secondary" onClick={onHide}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                  Guardar
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProductModal;
function refreshData(arg0: (prevState: any) => boolean) {
  throw new Error('Function not implemented.');
}

