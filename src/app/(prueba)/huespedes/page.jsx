import TablaModulo from "../../../components/TablaModulo";

export default function Huespedes() {
    return (
        
        
        <TablaModulo
            titulo="Clientes"
            endpoint="clientes"
            columnas={[
                { key: "id", label: "ID" },
                { key: "tipoDocumento", label: "Tipo Doc." },
                { key: "n_identificacion", label: "N° Identificación" },
                { key: "nombres", label: "Nombres" },
                { key: "apellidos", label: "Apellidos" },
                { key: "fechaNacimiento", label: "Fecha Nacimiento" },
                { key: "genero", label: "Género" },
                { key: "ciudadProcedencia", label: "Ciudad" },
                { key: "n_telefono", label: "Teléfono" },
                { key: "correo", label: "Correo" },
                { key: "ultimaVisita", label: "Última Visita" },
            ]}
            campos={[
                {
                    key: "tipoDocumento", label: "Tipo de Documento", type: "select", options: [
                        { value: "CC", label: "Cédula de Ciudadanía" },
                        { value: "CE", label: "Cédula de Extranjería" },
                        { value: "TI", label: "Tarjeta de Identidad" },
                        { value: "PA", label: "Pasaporte" },
                        { value: "NIT", label: "NIT" },
                    ]
                },
                { key: "n_identificacion", label: "N° Identificación", type: "text" },
                { key: "nombres", label: "Nombres", type: "text" },
                { key: "apellidos", label: "Apellidos", type: "text" },
                { key: "fechaNacimiento", label: "Fecha Nacimiento", type: "date" },
                { key: "profesion", label: "Profesión", type: "text" },
                {
                    key: "genero", label: "Género", type: "select", options: [
                        { value: "MASCULINO", label: "Masculino" },
                        { value: "FEMENINO", label: "Femenino" },
                        { value: "OTRO", label: "Otro" },
                    ]
                },
                { key: "ciudadProcedencia", label: "Ciudad de Procedencia", type: "text" },
                { key: "n_telefono", label: "Teléfono", type: "text" },
                { key: "correo", label: "Correo", type: "email" },
                { key: "ultimaVisita", label: "Última Visita", type: "date" },
            ]}
        />

        
    );
}