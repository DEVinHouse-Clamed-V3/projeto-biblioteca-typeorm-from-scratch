import { Router } from 'express';
import { Auditorio } from '../entities/Auditorio';
import { AppDataSource } from '../database/data-source';

const auditorioRoutes = Router();

/* Implemente aqui os métodos que irão atender as requisições HTTP. */
const auditorioRepository = AppDataSource.getRepository(Auditorio)

auditorioRoutes.get('/', async (request, response) => {
    try {

        const auditorios = await auditorioRepository.find()

        response.json(auditorios)
    } catch (error) {
        console.log(error)
        response.status(500).json({ error : 'Erro ao buscar os auditorios' })
    }   
})

auditorioRoutes.get('/:id', async (request, response) => {
    try  {
        const id  = Number(request.params.id)

        const auditorio = await auditorioRepository.findOne({where: {id}})

        if(auditorio) {
            response.json(auditorio)
        } else {
            response.status(404).json({ error: 'Auditorio não encontrado' })
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({ error : 'Erro ao buscar o auditorio'})
    }
})

export default auditorioRoutes;