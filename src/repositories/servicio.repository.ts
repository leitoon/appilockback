import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Servicio, ServicioRelations, Cliente, Encomienda} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EncomiendaRepository} from './encomienda.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly origenFK: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  public readonly destinoFK: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  public readonly encomiendaFK: BelongsToAccessor<Encomienda, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EncomiendaRepository') protected encomiendaRepositoryGetter: Getter<EncomiendaRepository>,
  ) {
    super(Servicio, dataSource);
    this.encomiendaFK = this.createBelongsToAccessorFor('encomiendaFK', encomiendaRepositoryGetter,);
    this.registerInclusionResolver('encomiendaFK', this.encomiendaFK.inclusionResolver);
    this.destinoFK = this.createBelongsToAccessorFor('destinoFK', clienteRepositoryGetter,);
    this.registerInclusionResolver('destinoFK', this.destinoFK.inclusionResolver);
    this.origenFK = this.createBelongsToAccessorFor('origenFK', clienteRepositoryGetter,);
    this.registerInclusionResolver('origenFK', this.origenFK.inclusionResolver);
  }
}
