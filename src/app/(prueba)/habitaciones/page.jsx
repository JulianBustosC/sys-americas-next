import TablaModulo from "../../../components/TablaModulo";

export default function habitaciones() {
    return (
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
                { key: "enServicio", label: "En Servicio", type: "select", options: [
                    { value: true, label: "EN SERVICIO" },
                    { value: false, label: "FUERA DE SERVICIO" }
                ] },

            ]}
        />
    );
}     