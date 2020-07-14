const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body
  const id = uuid()
  const likes = 0

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {
    title,
    url,
    techs
  } = request.body

  const { id } = request.params
  const rId = repositories.findIndex(repository => repository.id === id)

  if(rId < 0){
    return response.status(400).end()
    
  }
  
  const likes = repositories[rId].likes

  repositories[rId] = {
    id,
    title,
    url,
    techs,
    likes
  }

  return response.json(repositories[rId])

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const rId = repositories.findIndex(repository => repository.id == id)

  if(rId < 0){
    return response.status(400).json({"[ERROR]": "Invalid ID"})
  }

  repositories.splice(rId, 1)

  return response.status(204).end()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params
  const rId = repositories.findIndex(repository => repository.id === id)
  console.log(id, rId)

  if(rId < 0){
    return response.status(400).json({"[ERROR]": "Invalid ID"})
  }

  repositories[rId].likes ++

  response.json({"likes": repositories[rId].likes})
});

module.exports = app;
