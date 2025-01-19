import { Router } from 'express';
import { AppDataSource } from '../database/data-source'
import {Livro} from '../entities/Livro'

const livroRoutes = Router();

const bookstRepository = AppDataSource.getRepository(Livro) 

/*Rota para criar um novo livro*/
livroRoutes.post("/", async (request, response) => {
    try{
        const body = request.body

        if(!body.title){
            response
            .status(400)
            .json({error: 'O campo título é obrigatório'});
        }
        else if(!body.description){
            response
            .status(400)
            .json({error: 'O campo descrição é obrigatório'});
        }
        else if(!body.publication_date){
            response
            .status(400)
            .json({error: 'O campo data de publicação é obrigatório'});
        }
        else if(!body.isbn){
            response
            .status(400)
            .json({error: 'O campo código ISBN é obrigatório'});
        }
        else if(!body.language){
            response
            .status(400)
            .json({error: 'O campo idioma é obrigatório'});
        }
        else if(!body.page_count){
            response
            .status(400)
            .json({error: 'O campo número de páginas é obrigatório'});
        }
        else {
            const livro = new Livro()

            livro.title = body.title
            livro.description = body.description
            livro.publication_date = body.publication_date
            livro.isbn = body.isbn
            livro.language = body.language
            livro.page_count = body.page_count  
            livro.created_at = new Date() 
            livro.updated_at = new Date() 

            const booksCreated =  await bookstRepository.save(livro)

            response.status(200).json(booksCreated)
        } 

    } catch(error){
        console.error('Erro ao salvar o livro', error)
        response.status(500).json({error: 'Erro ao salvar o livro'})
    }
})

/*Rota para buscar todos os livros*/
livroRoutes.get("/", async (request, response) => { 
    try{
        const books = await bookstRepository.find()
        response.json(books)

    } catch(error){
        console.error('Erro ao buscar livros', error)
        response.status(500).json({error: 'Erro ao buscar as livros'})
    }
})

/*Rota para buscar um livro pelo id*/
livroRoutes.get("/:id", async (request, response) => {
    try{
        const id = Number(request.params.id);
        const booksInDataBase = await bookstRepository.findOne({
            where: {
                id: id
            },
        });

        if(!booksInDataBase){
            response.status(404).json({error: 'Livro não encontrado'})
        }else{
            response.json(booksInDataBase)
        }
    } catch (error) {
        console.error('Erro ao buscar o livro pelo id', error);
        response.status(500).json({error: 'Erro ao buscar o livro pelo id'});
    }
})

/*Rota para atualizar/alterar um livro pelo id*/
livroRoutes.put("/:id", async (request, response) => {
    try{
        const id = Number(request.params.id);
        const body = request.body;

        if('name' in body && !body.title){
            response.status(400).json({error: 'O campo titulo não pode ser vazio'})

        } else if('description' in body && !body.description){
            response.status(400).json({error: 'O campo descrição não pode ser vazio'})

        } else if('publication_date' in body && !body.publication_date){
            response.status(400).json({error: 'O campo data de publicação não pode ser vazio'})

        } else if('isbn' in body && !body.isbn){
            response.status(400).json({error: 'O campo código ISBN não pode ser vazio'})

        } else if('language' in body && !body.language){
            response.status(400).json({error: 'O campo idioma não pode ser vazio'})

        } else if('page_count' in body && !body.page_count){
            response.status(400).json({error: 'O campo número de páginas não pode ser vazio'})

        }else {
            const booksInDataBase = await bookstRepository.findOne({
                where: {
                    id: id
                },
            });

        if(!booksInDataBase){
            response.status(404).json({error: 'Livro com esse id não encontrado'})
        }else{
            
                booksInDataBase.title = body.title
                booksInDataBase.description = body.description
                booksInDataBase.publication_date = body.publication_date
                booksInDataBase.isbn = body.isbn
                booksInDataBase.language = body.language
                booksInDataBase.page_count = body.page_count
                booksInDataBase.updated_at = new Date()
                booksInDataBase.created_at = booksInDataBase.created_at

                const booksUpdated =  await bookstRepository.save(booksInDataBase) 
                response.json(booksUpdated)
            }
        }
    }catch{
        response.status(500).json({error: 'Erro ao atualizar o livro'})
    }
})

/*Rota para deletar um livro pelo id*/
livroRoutes.delete("/:id", async (request, response) => {
    try{
        const id = Number(request.params.id);
        const booksDelected =  await bookstRepository.delete(id)

        if(booksDelected.affected === 0){
            response.status(404).json({error: 'Livro não encontrado, e portanto, não foi deletado.'})
        } else{
            response.status(204).json({ message: 'Livro deletado com sucesso' });
        }
        
    }catch{
        response.status(500).json({error: 'Erro ao deletar o livro'})
    }
})

export default livroRoutes;