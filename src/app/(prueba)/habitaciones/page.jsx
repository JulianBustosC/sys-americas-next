import TablaModulo from "../../../components/TablaModulo";
import Card from "../../../components/Card";
import { MdMeetingRoom, MdOutlineSensorDoor, MdOutlineRoomPreferences, MdBedroomParent } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import "./habitaciones.css";
export default function habitaciones() {
    return (
        <>

            
            <header className="page-header">

                <div className="page-title">


                    <FaBed className="icon" />
                    <div className="title" >


                        <h1>Habitaciones</h1>
                        <h2>Gestión de Habitaciones</h2>
                    </div>



                </div>



            </header>
            <section
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                    marginLeft: "10px",
                    marginRight: "10px"

                }}
            >

                <Card
                    titulo="Habitaciones"
                    value={100}
                    fondo="59 130 246"

                >
                    <FaBed className="icon" />
                </Card>
                <Card
                    titulo="Libres"
                    value={60}
                    fondo="16 185 129"


                >
                    <MdOutlineSensorDoor className="icon" />
                </Card>
                <Card
                    titulo="Ocupadas"
                    value={40}
                    fondo="239 68 68"
                >
                    <MdBedroomParent className="icon" />
                </Card>
                <Card
                    titulo="Fuera de Servicio"
                    value={0}
                    fondo="117 114 126"
                >
                    <MdOutlineRoomPreferences className="icon" />
                </Card>
            </section>

            <TablaModulo
                titulo="Habitaciones"
                endpoint="habitacions"
                columnas={[
                    { key: "id", label: "ID" },
                    { key: "capacidad", label: "Capacidad" },
                    { key: "tipo", label: "Tipo" },
                    { key: "bloque", label: "Bloque" },
                    { key: "piso", label: "Piso" },
                    { key: "numero", label: "Número" },
                    { key: "libre", label: "Libre" },
                    { key: "enServicio", label: "En Servicio" },

                ]}
                campos={[
                    { key: "capacidad", label: "Capacidad", type: "number" },
                    { key: "tipo", label: "Tipo", type: "select", options: ["SENCILLA", "DOBLE", "FAMILIAR"] },
                    { key: "bloque", label: "Bloque", type: "text" },
                    { key: "piso", label: "Piso", type: "number" },
                    { key: "numero", label: "Número", type: "number" },
                    {
                        key: "libre", label: "Libre", type: "select", options: [
                            { value: true, label: "LIBRE" },
                            { value: false, label: "OCUPADA" }
                        ]
                    },
                    {
                        key: "enServicio", label: "En Servicio", type: "select", options: [
                            { value: true, label: "EN SERVICIO" },
                            { value: false, label: "FUERA DE SERVICIO" }
                        ]
                    },

                ]}
            />


        </>


    );
}     