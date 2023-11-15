import { useEffect, useState } from "react";
import { DtoEmpleado, Rol } from "../../types/DTOEmpleado";
import { DtoEmpleadoService } from "../../services/EmpleadoService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import DtoEmpleadoModal from "../ProductModal/EmpleadoModal";

import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import "./EmpleadoTabla.css";
import { PlusCircle, PersonCircle } from "react-bootstrap-icons";


const estiloBoton = {
  backgroundColor: "#7CB518",
  color: 'white',
  borderColor: "#7CB518", // para asegurar que el texto sea legible en el fondo verde
  borderRadius: '15px'
};

const EmpleadoTable = () => {
  const [dtoEmpleados, setDtoEmpleados] = useState<DtoEmpleado[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDtoEmpleados = async () => {
      try {
        const dtoEmpleado = await DtoEmpleadoService.getDtoEmpleados();
        setDtoEmpleados(dtoEmpleado);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDtoEmpleados();
  }, []);

  const initializeNewDtoEmpleado = (): DtoEmpleado => {
    return {
      id: 0,
      id_Empleado: "",
      nombre_Empleado: "",
      apellido_Empleado: "",
      username_Empleado: "",
      rol_Empleado: Rol.Elija,
      email_Empleado: "",
      telefono_Empleado: 0,
      localidad_Empleado: "",
      calle_Empleado: "",
      nro_direccion_Empleado: 0,
      contraseña_Empleado: "",
      contraseña_Empleado2: "",
    };
  };

  const [selectedDtoEmpleado, setSelectedDtoEmpleado] = useState<DtoEmpleado>(initializeNewDtoEmpleado());

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  const handleClick = (newTitle: string, empleados: DtoEmpleado, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setSelectedDtoEmpleado(empleados);
    setShowModal(true);
  };

  const handleDeleteDtoEmpleado = async (dtoEmpleado: DtoEmpleado) => {
    try {
      await DtoEmpleadoService.deleteDtoEmpleado(dtoEmpleado.id);
      const updatedDtoEmpleados = dtoEmpleados.filter((p) => p.id !== dtoEmpleado.id);
      setDtoEmpleados(updatedDtoEmpleados);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const handleUpdateDtoEmpleado = (updatedDtoEmpleado: DtoEmpleado) => {
    try {
      const updatedDtoEmpleados = dtoEmpleados.map((p) =>
        p.id === updatedDtoEmpleado.id ? updatedDtoEmpleado : p
      );
      setDtoEmpleados(updatedDtoEmpleados);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  return (
    <>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="button-containerH4" style={{ marginLeft: '10px' }}>
          <button className="buttonH4_2" style={{ borderBottomLeftRadius: '10px', borderTopLeftRadius: '10px' }}>Clientes</button>
          <button className="buttonH4_2" style={{ color: 'orange', textDecoration: 'underline', borderColor: "black" }} >Empleados</button>
          <button className="buttonH4_2" style={{ borderBottomRightRadius: '10px', borderTopRightRadius: '10px' }}>Todos los usuarios</button>
        </div>
        <div style={{ textAlign: 'right', paddingRight: '20px' }}>
          <Button
            style={estiloBoton}
            onClick={() =>
              handleClick("+ Agregar nuevo Empleado", initializeNewDtoEmpleado(), ModalType.CREATE)
            }
          >
            <PlusCircle style={{ marginRight: '5px', verticalAlign: 'middle', fontSize: '20px' }} />
            Añadir nuevo Empleado
          </Button>
        </div>

      </div>

    <tr>
<br />
    </tr>
  

      {isLoading ? (
        <Loader />
      ) : (
        <Table hover style={{ tableLayout: 'fixed', borderRadius:  "15px", backgroundColor: '#D9D9D9' }}>
          <thead>
            <tr>
              <td style={{width: '12%', textAlign: 'left', whiteSpace: 'nowrap', backgroundColor: '#D9D9D9' }}>
            <input type="checkbox" style={{ marginRight: '8px', marginLeft: '5px', verticalAlign: 'middle' }} />
            Seleccionar Todos
              </td>
              <td style={{ width: '30%', backgroundColor: '#D9D9D9' }}>
               <strong>Datos empleado</strong> 
              </td>
              <td style={{backgroundColor: '#D9D9D9' }}>
                <strong>Rol empleado</strong>
              </td>
              <td style={{width: '10%', backgroundColor: '#D9D9D9' }}></td>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"#D9D9D9"}}>
            {dtoEmpleados.map((dtoEmpleados) => (
              <tr key={dtoEmpleados.id}>
                <td style={{ width: '12%',backgroundColor:"#EDEAEA" }}>
                  <input type="checkbox" style={{ marginLeft: '8px' }} />
                  <PersonCircle style={{ marginLeft: '30px', verticalAlign: 'middle', fontSize: '60px' }} />
                </td>
                <td style={{ width: '30%',backgroundColor:"#EDEAEA" }}>
                  <div>{`${dtoEmpleados.nombre_Empleado} ${dtoEmpleados.apellido_Empleado}`} </div>
                  <div>{dtoEmpleados.email_Empleado} </div>
                </td>
                <td style={{ width: '30%', backgroundColor:"#EDEAEA"  }}> {dtoEmpleados.rol_Empleado}</td>
                <td style={{ width: '10%', backgroundColor:"#EDEAEA" }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px' }}>
                      <EditButton
                        onClick={() =>
                          handleClick("Editar Empleado", dtoEmpleados, ModalType.UPDATE)
                        }
                      />
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                      <DeleteButton
                        onClick={() =>
                          handleClick("Borrar Empleado", dtoEmpleados, ModalType.DELETE)
                        }
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <DtoEmpleadoModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          empleados={selectedDtoEmpleado}
          onDelete={handleDeleteDtoEmpleado}
          onSaveUpdate={handleUpdateDtoEmpleado}
        />
      )}
    </>
  );
};

export default EmpleadoTable;
