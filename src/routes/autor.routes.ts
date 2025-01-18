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
      return res.status(500).json({ message: 'Erro ao conectar ao banco de dados', error});
    }
  }
  next();
})

const authorRepository = AppDataSource.getRepository(Autor);

  autorRoutes.post ('/', async (req, res) =>{
    const {name, birthdate, biography, nationality, active} = req.body;

    try {
      const newAuthor = authorRepository.create({
        name,
        birthdate,
        biography,
        nationality,
        active,
      });
      await authorRepository.save(newAuthor);
      return res.status(201).json(newAuthor);
    } catch (error) {
      return res.status(500). json({ message: 'Erro ao criar autor', error});
    }
  });

  autorRoutes.post('/', async (req, res)=> {
    const {name, birthdate, biography, nationality, active} = req.body;

    if( !name || !birthdate || !nationality || active === undefined) {
      return res.status(400).json({ message: 'Campost obrigatórios ausentes'})
    }
    try {
      const newAuthor = authorRepository.create ({
        name,
        birthdate,
        biography,
        nationality,
        active,
      });
      await authorRepository.save(newAuthor);
      return res.status(201).json(newAuthor);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar autor', error});
    }
  });

  autorRoutes.get('/', async (req, res) => {
    try {
      const authors = await authorRepository.find();
      return res.json(authors);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar autores', error });
    }
  });

export default autorRoutes;