import React from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { DtoEmpleado } from '../../types/DTOEmpleado';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

type DtoEmpleadoModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  empleados: DtoEmpleado;
  onDelete: (dtoEmpleado: DtoEmpleado) => void;
  onSaveUpdate: (dtoEmpleado: DtoEmpleado) => void;
};

const DtoEmpleadoModal: React.FC<DtoEmpleadoModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  empleados,
  onDelete,
  onSaveUpdate,
}: DtoEmpleadoModalProps) => {

  const validationSchema = Yup.object().shape({
    id: Yup.number().integer().min(0),
    // title: Yup.string().required('El nombre es requerido'),
    nombre_Empleado: Yup.string().required('El nombre es requerido'),
    // username_Empleado: Yup.string().required('El username es requerido'),
    apellido_Empleado: Yup.string().required('El apellido es requerido'),
    email_Empleado: Yup.string().required('El email es requerido'),
    calle_Empleado: Yup.string().required('La direccion es requerida'),
    localidad_Empleado: Yup.string().required('El departamento es requerido'),
    contraseña_Empleado: Yup.string().required('La contraseña es requerida'),
    contraseña_Empleado2: Yup.string().required('La contraseña es requerida'),
    telefono_Empleado: Yup.string().matches(/^\d+$/, 'Solo puede ingresar numeros')
      .required('El telefono es requerido'),
    nro_direccion_Empleado: Yup.string().matches(/^\d+$/, 'Solo puede ingresar numeros')
      .required('El numero de calle es requerido'),
    rol_Empleado: Yup.string().oneOf(['Cajero', 'Cocinero', 'Administrador', 'Delivery'], 'El rol es requerido y debe ser uno de los valores permitidos')
  });

  const handleSaveUpdate = async (empleado: DtoEmpleado) => {
    try {
      const isNew = empleado.id === 0;
      await onSaveUpdate(empleado);
      toast.success(isNew ? 'Empleado Creado' : 'Empleado Actualizado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }


  };



  const handleDelete = async () => {
    try {
      const isNew = empleados.id === 0;
      await onDelete(empleados);
      toast.success(isNew ? 'Empleado creado' : 'Empleado eliminado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }
  };


  const formik = useFormik({
    initialValues: empleados,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: DtoEmpleado) => handleSaveUpdate(obj),

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
              ¿Está seguro que desea eliminar este empleado?
              <br /> <strong>{`${empleados.username_Empleado} ${empleados.nombre_Empleado}${empleados.apellido_Empleado}`}</strong>
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
        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <th style={{ textAlign: 'left', textDecoration: 'underline', fontSize: '24px' }}> Datos Personales
            </th>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col>


                  <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      name="nombre_Empleado"
                      type="text"
                      value={formik.values.nombre_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.nombre_Empleado && formik.touched.nombre_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.nombre_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>


                </Col>
                <Col>
                  <Form.Group controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      name="apellido_Empleado"
                      type="text"
                      value={formik.values.apellido_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.apellido_Empleado && formik.touched.apellido_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.apellido_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>


              <Row>
                <Col>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Correo electronico</Form.Label>
                    <Form.Control
                      name="email_Empleado"
                      type="text"
                      value={formik.values.email_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.email_Empleado && formik.touched.email_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>


                </Col>
                <Col>
                  <Form.Group controlId="formTelefono">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                      name="telefono_Empleado"
                      type="text"
                      value={formik.values.telefono_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.telefono_Empleado && formik.touched.telefono_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.telefono_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>


              <Row>
                <Col>
                  <Form.Group controlId="formDireccion">
                    <Form.Label>Calle</Form.Label>
                    <Form.Control
                      name="calle_Empleado"
                      type="text"
                      value={formik.values.calle_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.calle_Empleado && formik.touched.calle_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.calle_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formDepartamento">
                    <Form.Label>numero</Form.Label>
                    <Form.Control
                      name="nro_direccion_Empleado"
                      type="text"
                      value={formik.values.nro_direccion_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.nro_direccion_Empleado && formik.touched.nro_direccion_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.nro_direccion_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formDepartamento">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control
                      name="localidad_Empleado"
                      type="text"
                      value={formik.values.localidad_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.localidad_Empleado && formik.touched.localidad_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.localidad_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>






              <th style={{ textAlign: 'left', textDecoration: 'underline', fontSize: '24px' }}> Datos de usuario
              </th>

              <Form.Group controlId="formRol" style={{display:'flex'}}>
                <Form.Label style={{verticalAlign:'center', marginRight:'15px'}}>Rol:</Form.Label>
                <Dropdown onSelect={(selectedRole) => formik.setFieldValue('rol_Empleado', selectedRole)} style={{textAlign:'center'}}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {formik.values.rol_Empleado || 'Seleccione un Rol'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Cajero">Cajero</Dropdown.Item>
                    <Dropdown.Item eventKey="Cocinero">Cocinero</Dropdown.Item>
                    <Dropdown.Item eventKey="Administrador">Administrador</Dropdown.Item>
                    <Dropdown.Item eventKey="Delivery">Delivery</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rol_Empleado}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      name="contraseña_Empleado"
                      type="password"  // Cambiado a 'password' para ocultar el texto
                      value={formik.values.contraseña_Empleado}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.contraseña_Empleado && formik.touched.contraseña_Empleado)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.contraseña_Empleado}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPassword2">
                    <Form.Label>Repita la contraseña</Form.Label>
                    <Form.Control
                      name="contraseña_Empleado2"
                      type="password"  // Cambiado a 'password' para ocultar el texto
                      value={formik.values.contraseña_Empleado2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={Boolean(formik.errors.contraseña_Empleado2 && formik.touched.contraseña_Empleado2)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.contraseña_Empleado2}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>


              <Modal.Footer className="mt-4" style={{ justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={onHide} style={{ backgroundColor: "red", borderBlockColor: "red", borderRadius: '15px' }}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={!formik.isValid} style={{ backgroundColor: "green", borderBlockColor: "green", borderRadius: '15px' }}>
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

export default DtoEmpleadoModal;