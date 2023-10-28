import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { ProductService } from "../../services/ProductService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import ProductModal from "../ProductModal/ProductModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getProducts();
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const initializeNewProduct = (): Product => {
    return {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    };
  };

  const [selectedProduct, setSelectedProduct] = useState<Product>(initializeNewProduct());

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  const handleClick = (newTitle: string, prod: Product, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setSelectedProduct(prod);
    setShowModal(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await ProductService.deleteProduct(product.id);
      const updatedProducts = products.filter((p) => p.id !== product.id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    try {
      const updatedProducts = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={() =>
          handleClick("Nuevo Producto", initializeNewProduct(), ModalType.CREATE)
        }
      >
        Nuevo Producto
      </Button>

      {isLoading ? (
        <Loader />
      ) : (
        <Table hover>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Imagen</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>
                  <EditButton
                    onClick={() =>
                      handleClick("Editar Producto", product, ModalType.UPDATE)
                    }
                  />
                </td>
                <td>
                  <DeleteButton
                    onClick={() =>
                      handleClick("Borrar Producto", product, ModalType.DELETE)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <ProductModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          prod={selectedProduct}
          onDelete={handleDeleteProduct}
          onSaveUpdate={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default ProductTable;
