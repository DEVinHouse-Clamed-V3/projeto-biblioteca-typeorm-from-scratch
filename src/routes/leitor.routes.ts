import { Request, Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Leitor } from "../entities/Leitor";
import { read } from "fs";

const leitorRoutes = Router();

//-------------Rotas-------------------//

//Criar leitor
leitorRoutes.post("/", async (request, response) => {
  try {
    const body = request.body;

    if (!body.nome) {
      return response
        .status(400)
        .json({ error: "O campo 'nome' é obrigatório!" });
    } else if (!body.email) {
      return response
        .status(400)
        .json({ error: "O campo 'email' é obrigatório!" });
    } else if (!body.telefone) {
      return response
        .status(400)
        .json({ error: "O campo 'telefone' é obrigatório!" });
    } else if (!body.dataNascimento) {
      return response
        .status(400)
        .json({ error: "O campo 'dataNascimento' é obrigatório!" });
    } else if (!body.endereco) {
      return response
        .status(400)
        .json({ error: "O campo 'endereco' é obrigatório!" });
    } else if (!body.ativo) {
      return response
        .status(400)
        .json({ error: "O campo 'ativo' é obrigatório!" });
    } else {
      const leitor = new Leitor();

      leitor.nome = body.nome;
      leitor.email = body.email;
      leitor.telefone = body.telefone;
      const parts = body.dataNascimento.split("/"); 
      const dataNascimento = new Date(parts[2], parts[1] - 1, parts[0]);
      leitor.dataNascimento = dataNascimento;
      leitor.endereco = body.endereco;
      leitor.ativo = body.ativo;
      leitor.criadoEm = new Date();
      leitor.atualizadoEm = new Date();

      const readerRepository = AppDataSource.getRepository(Leitor);

      const leitorCriado = await readerRepository.save(leitor);

      response.status(201).json(leitorCriado);
    }
  } catch (error) {
    response.status(500).json({ error: "Erro ao cadastrar leitor" });
  }
});

//Buscar todos os leitores
leitorRoutes.get("/", async (request, response) => {
  try {
    const readerRepository = AppDataSource.getRepository(Leitor);
    const readers = await readerRepository.find();
    response.json(readers);
  } catch (error) {
    response.status(500).json({ error: "Erro ao buscar leitores" });
  }
});

//Buscar leitor por id
leitorRoutes.get("/:id", async (request: Request, response) => {
  try {
    const readerRepository = AppDataSource.getRepository(Leitor);
    const readers = await readerRepository.findOne({
      where: {
        id: parseInt(request.params.id),
      },
    });

    if (!readers) {
      response.status(404).json({ error: "Leitor não encontrado" });
    } else {
      response.status(201).json(readers);
    }
  } catch (error) {
    response.status(500).json({ error: "Erro ao buscar leitor" });
  }
});

//Atualizar leitor
leitorRoutes.put("/:id", async (request: Request, response) => {
  try {
    const readerRepository = AppDataSource.getRepository(Leitor);
    const id = Number(request.params.id);
    const body = request.body;
    const readerInDB = await readerRepository.findOne({ where: { id } });
    if (!readerInDB) {
      response.status(404).json({ error: "Leitor não encontrado" });
    } else {
      readerInDB.nome = body.nome;
      readerInDB.email = body.email;
      readerInDB.telefone = body.telefone;
      const parts = body.dataNascimento.split("/"); 
      const dataNascimento = new Date(parts[2], parts[1] - 1, parts[0]);
      readerInDB.dataNascimento = dataNascimento;
      readerInDB.endereco = body.endereco;
      readerInDB.ativo = body.ativo;
      readerInDB.atualizadoEm = new Date();

      await readerRepository.save(readerInDB);
      response.json(readerInDB);
    }
  } catch {
    response.status(500).json({ error: "Erro ao atualizar o leitor" });
  }
});

//Deletar leitor
leitorRoutes.delete("/:id", async (request: Request, response) => {
  try {
    const readerRepository = AppDataSource.getRepository(Leitor);
    const id = Number(request.params.id);
    const deletedReader = await readerRepository.delete(id);
    if (deletedReader.affected === 0) {
      response
        .status(404)
        .json({ error: "Leitor não encontrado, portanto não foi deletado" });
    } else {
      response.status(204).json();
    }
  } catch (error) {
    response.status(500).json({ error: "Erro ao deletar leitor" });
  }
});

export default leitorRoutes;
