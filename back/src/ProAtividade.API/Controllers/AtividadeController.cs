using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService _atividadeService;

        public AtividadeController(IAtividadeService atividadeService){
            _atividadeService = atividadeService;
        }
        [HttpGet]
        public async Task<IActionResult> Get(){
            try{
                 var atividades = await _atividadeService.PegarTodasAtividadesAsync();
                 if(atividades == null){
                     return NoContent();
                 } 
                 return Ok(atividades);
            }
            catch (System.Exception ex){
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar atividades. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id){
            try{
                 var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                 if(atividade == null){
                     return NoContent();
                 } 
                 return Ok(atividade);
            }
            catch (System.Exception ex){
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar atividade com id:{id}. Erro: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(Atividade model){
            try{
                 var atividade = await _atividadeService.AdicionarAtividade(model);
                 if(atividade == null){
                     return NoContent();
                 } 
                 return Ok(atividade);
            }
            catch (System.Exception ex){
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar atividade. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model){
            try{
                if(model.Id != id){
                    this.StatusCode(StatusCodes.Status409Conflict,
                    "A atividade que está a tentar atualizar é a errada.");
                }
                 var atividade = await _atividadeService.AtualizarAtividade(model);
                 if(atividade == null){
                     return NoContent();
                 } 
                 return Ok(atividade);
            }
            catch (System.Exception ex){
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar atividade com id:{id}. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete (int id){
            try{
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if(atividade == null){
                    this.StatusCode(StatusCodes.Status409Conflict,
                    "A atividade que está a tentar eliminar é a errada");
                }
                if(await _atividadeService.EliminarAtividade(id)){
                    return Ok(new {message = "Eliminado"});
                }else{
                    return BadRequest("Ocorreu um problema específico ao tentar eliminar a atividade");
                }
            }
            catch (System.Exception ex){
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar eliminar atividade com id:{id}. Erro: {ex.Message}");
            }
        }
    }
}

