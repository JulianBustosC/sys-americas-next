
import "./Header.css";
import { IoMdSearch, IoIosMail } from "react-icons/io";
import { IoNotificationsCircle, IoPersonCircle } from "react-icons/io5";

function Header() {


  return (
    <header className='header'>
      <div className="group_left">
        <div className="logo_container">
          <img src="/src/imgs/logo.png" alt="Company Logo" />
        </div>

        <div className="buscar_container">
          <input
            type="text"
            placeholder="Buscar..."
            className="buscar" />

          <IoMdSearch className="icon lupa" id="buscar-item" />

        </div>
      </div>


      <div className="group_rigth">
        {/*}<a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">
          <IoIosMail className="icon mail" />
        </a>
        {*/}
        <button>
          <IoNotificationsCircle className="icon campana" />
        </button>
        <button>
          <IoPersonCircle className="icon profile" />
        </button>

      </div>

    </header>
  );


}
export default Header;