controller/veterinario/get.mjs';
import { veterinarioPeloId } from '../../controller/veterinario/getById.mjs';

const router  = express.Router();

router.get("/veterinarios/", async (req, res) => {
	try {
		const veterinarios = await getListaVeterinariosController();

		res.status(200).json(veterinarios).end();
	} catch (error) {
		res.status(400).json({erro: error.message}).end();
	}
});

router.get("/veterinarios/:id", async (req, res) => {
	const idVeterinario = req.params.id;

	try {
		const veterinario = await veterinarioPeloId(idVeterinario);

		res.status(200).json(veterinario).end();
	} catch (error) {
		res.status(400).json({erro: error.message}).end();
	}
});


export default router;