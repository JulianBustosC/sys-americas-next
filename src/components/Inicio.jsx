import Card from "./Card";
import "./Inicio.css";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { LiaHotelSolid } from "react-icons/lia";
import { CiShop } from "react-icons/ci";
import { BsCalendarWeek } from "react-icons/bs";

const Inicio = () => {
  return (<>
    <div className="inicio ">
      <div className="card-container">
        <Card titulo={"Tienda"} value={15}><CiShop className="card-icon" /></Card>
        <Card titulo={"Reservas"} value={75}> <LuCalendarClock className="card-icon" /> </Card>
        <Card titulo={"Hospedajes"} value={50}><LiaHotelSolid className="card-icon" /></Card>
        <Card titulo={"Huespedes"} value={300}><IoMdPerson className="card-icon" /></Card>
        <Card titulo={"Habitaciones"} value={120}> < MdOutlineMeetingRoom className="card-icon" /></Card>



      </div>
    </div>
  </>
  );
}

export default Inicio;