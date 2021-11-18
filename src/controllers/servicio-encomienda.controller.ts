import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Encomienda,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioEncomiendaController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/encomienda', {
    responses: {
      '200': {
        description: 'Encomienda belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encomienda)},
          },
        },
      },
    },
  })
  async getEncomienda(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<Encomienda> {
    return this.servicioRepository.encomiendaFK(id);
  }
}
