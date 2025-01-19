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

auditorioRoutes.post('/', async (request, response) => {
    try {
        const auditorio = request.body

        if(!auditorio.name) {
            response.status(400).json({ error: 'Nome do auditório é obrigatório'})
        } else if(!auditorio.capacity) {
            response.status(400).json({ error: 'Capacidade do auditório é obrigatório'})
        } else if(!auditorio.location) {
            response.status(400).json({ error: 'Localização do auditório é obrigatório'})
        } else if(!auditorio.has_projector) {
            response.status(400).json({ error: 'Informação sobre o projetor é obrigatório'})
        } else if(!auditorio.has_sound_system) { 
            response.status(400).json({ error: 'Informação sobre o sistema de som é obrigatório'})
        }
        
        else {
            const newAuditorio = new Auditorio()
    
            newAuditorio.name = auditorio.name
            newAuditorio.capacity = auditorio.capacity
            newAuditorio.location = auditorio.location
            newAuditorio.has_projector = auditorio.has_projector
            newAuditorio.has_sound_system = auditorio.has_sound_system
            newAuditorio.created_at = new Date()
            newAuditorio.updated_at = new Date()

            const savedProduct = await auditorioRepository.save(newAuditorio)
    
            response.status(201).json(savedProduct)
            
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({ error : 'Erro ao salvar o auditorio'})
    }
})

export default auditorioRoutes;