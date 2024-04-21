import { useState, useEffect } from "react";
import {
  getSingers,
  createSinger,
  updateSinger,
  deleteSinger,
  getSingerById,
} from "../services/singerServices";
import "../styles/index.css";
import Swal from "sweetalert2";
import Image from "next/image";
import Virgen from "../images/virgen02.png";

const Layout = () => {
  return (
    <div className="grid grid-cols-2 container-main-layout">
      <div>
        <aside className="container-text">
          <p className="principal-text">
            Collect <br /> Mother Mary <br /> art{" "}
            <b className="rounded-text">nft</b>
          </p>
          <p className="second-text">
            {" "}
            Find the best upcoming and live NFT drops. Moonly provides analytics
            to help you make good NFT investments.
          </p>
          <div className="button-container">
            <button className="button-see">Ver en Opensea</button>
            <div className="lines-container">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </aside>
      </div>
      <div>
        <Image src={Virgen} width={512} height={647} alt="Virgen" />
      </div>
    </div>
  );
};

export default function Home() {
  const [singers, setSingers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    musicalGenre: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSinger, setSelectedSinger] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [foundSinger, setFoundSinger] = useState(null);

  useEffect(() => {
    fetchSingers();
  }, []);

  const fetchSingers = async () => {
    try {
      const data = await getSingers();
      setSingers(data.data);
    } catch (error) {
      console.error("Error fetching singers:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSinger = async () => {
    // Verificar si algún campo está vacío
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.age ||
      !formData.musicalGenre
    ) {
      Swal.fire("¡Error!", "Por favor, completa todos los campos", "error");
      return;
    }

    try {
      await createSinger(formData);
      await fetchSingers();
      setFormData({
        name: "",
        lastName: "",
        age: "",
        musicalGenre: "",
      }); // Limpiar los campos de entrada
      Swal.fire("¡Éxito!", "Cantante creado exitosamente", "success");
    } catch (error) {
      Swal.fire("¡Error!", "No se pudo crear el cantante", "error");
    }
  };

  const handleDeleteSinger = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    });

    if (result.isConfirmed) {
      try {
        await deleteSinger(id);
        await fetchSingers();
        Swal.fire("¡Eliminado!", "El cantante ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("¡Error!", "No se pudo eliminar el cantante", "error");
      }
    }
  };

  const handleEditSinger = (singer) => {
    setSelectedSinger(singer);
    setIsModalOpen(true);

    setFormData({
      name: singer.name,
      lastName: singer.lastName,
      age: singer.age.toString(), // Convertir a cadena de texto
      musicalGenre: singer.musicalGenre,
    });
  };

  const handleUpdateSinger = async () => {
    // Verificar si algún campo está vacío
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.age ||
      !formData.musicalGenre
    ) {
      Swal.fire("¡Error!", "Por favor, completa todos los campos", "error");
      return;
    }

    try {
      await updateSinger(selectedSinger.id, formData);
      setIsModalOpen(false);
      await fetchSingers();
      Swal.fire("¡Éxito!", "Cantante actualizado exitosamente", "success");
    } catch (error) {
      Swal.fire("¡Error!", "No se pudo actualizar el cantante", "error");
    }
  };

  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSingerById = async () => {
    try {
      const singer = await getSingerById(parseInt(searchId));
      if (singer) {
        setFoundSinger(singer);
        setSearchId("");
      } else {
        Swal.fire(
          "¡Error!",
          "No se encontró ningún cantante con ese ID",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("¡Error!", "No se pudo encontrar el cantante", "error");
    }
  };

  return (
    <div>
      <Layout />
      <br />
      <br />
      <h1>Lista de Cantantes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Género Musical</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!singers.length ? (
            <tr>
              <td colSpan="6">No hay cantantes disponibles</td>
            </tr>
          ) : (
            singers.map((singer) => (
              <tr key={singer.id}>
                <td>{singer.id}</td>
                <td>{singer.name}</td>
                <td>{singer.lastName}</td>
                <td>{singer.age}</td>
                <td>{singer.musicalGenre}</td>
                <td>
                  <button onClick={() => handleDeleteSinger(singer.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => handleEditSinger(singer)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Agregar Cantante</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="musicalGenre"
          placeholder="Género Musical"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          onChange={handleInputChange}
        />
        <button onClick={handleCreateSinger}>Agregar Cantante</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Cantante</h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Edad"
              value={formData.age}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="musicalGenre"
              placeholder="Género Musical"
              value={formData.musicalGenre}
              onChange={handleInputChange}
            />
            <button onClick={handleUpdateSinger}>Actualizar Cantante</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Agregar campo de búsqueda por ID */}
      <div>
        <input
          type="number"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={handleSearchIdChange}
        />
        <button onClick={handleSearchSingerById}>Buscar</button>
      </div>

      {/* Mostrar los detalles del cantante encontrado, si existe */}
      {foundSinger && (
        <div className="details-container">
          <h2>Detalles del Cantante</h2>
          <p>
            <span>ID:</span> {foundSinger.id}
          </p>
          <p>
            <span>Nombre:</span> {foundSinger.name}
          </p>
          <p>
            <span>Apellido:</span> {foundSinger.lastName}
          </p>
          <p>
            <span>Edad:</span> {foundSinger.age}
          </p>
          <p>
            <span>Género Musical:</span> {foundSinger.musicalGenre}
          </p>
        </div>
      )}
    </div>
  );
}
