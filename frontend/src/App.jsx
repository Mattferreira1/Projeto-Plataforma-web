
import "primereact/resources/themes/lara-light-blue/theme.css"
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import Paths from "./routes/paths";
import { AuthContext } from "./Contexts/AuthContext";



const App=()=>{



  return(
    <>
      <AuthContext>
        <Paths/>
      </AuthContext>

    </>
  );
}
export default App