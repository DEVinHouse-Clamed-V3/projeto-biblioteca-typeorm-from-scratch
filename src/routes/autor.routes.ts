import { Router } from 'express';
import { Autor } from '../entities/Autor';
import { AppDataSource } from '../database/data-source';

const autorRoutes = Router();

autorRoutes.use(async (req, res, next) => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Conexão com o banco de dados inicializada!');
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao conectar ao banco de dados', error });
    }
  }
  next();
})

const authorRepository = AppDataSource.getRepository(Autor);

//Cria um novo autor

autorRoutes.post('/', async (req, res) => {
  const { name, birthdate, biography, nationality, active } = req.body;

  if (!name || !birthdate || !nationality || active === undefined) {
    return res.status(400).json({ message: 'Campost obrigatórios ausentes' })
  }
  try {
    const newAuthor = authorRepository.create({
      name,
      birthdate,
      biography,
      nationality,
      active,
      created_at: new Date(),
      updated_at: new Date()
    });
    await authorRepository.save(newAuthor);
    return res.status(201).json(newAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar autor', error });
  }
});

// Busca todos os autores
autorRoutes.get('/', async (req, res) => {
  try {
    const authors = await authorRepository.find();
    return res.json(authors);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar autores', error });
  }
});

// Busca por ID
autorRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const author = await authorRepository.findOneBy({ id: parseInt(id) });

    if (!author) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }

    return res.json(author);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar autor', error });
  }
});

// atualiza autor
autorRoutes.put('/:id', async (req, res) => {
  const {id} = req.params;
  const { name, birthdate, biography, nationality, active } = req.body;

  try {
    const author = await authorRepository.findOneBy({ id: parseInt(id) });

    if (!author) {
      return res.status(404).json({ message: 'Autor não encontrado' })
    }

    authorRepository.merge(author, { name, birthdate, biography, nationality, active});
    const updatedAuthor = await authorRepository.save(author);

    return res.json(updatedAuthor);
  } catch (error) {
    return res.status(500).json ({ message: 'Erro ao atualizar autor', error})
  }
});

// Deleta autor
autorRoutes.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await authorRepository.delete({ id: parseInt(id)});

    if (result.affected === 0) {
      return res.status(400).json({ message: 'Autor não encontrado'})
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar autor', error})
  }
});
export default autorRoutes;