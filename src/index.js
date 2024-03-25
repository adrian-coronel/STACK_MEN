import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { join, dirname} from "path";
import { fileURLToPath } from "url";

// Initialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('port', process.env.PORT || 3000);

// Configuración de la carpeta para las vistas
app.set('views', join(__dirname, 'views'));


// Confgurnado motor de plantilla
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layout'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'))

app.use(express.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

// Publics Files
app.use(express.static(join(__dirname, 'public')));


// Run server
app.listen(app.get('port'), () => {
  console.log("Cargando el puerto", app.get('port'))
})
