import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Encomienda} from './encomienda.model';

@model({settings: {strict: false}})
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;





  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;



  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @belongsTo(() => Cliente, {name: 'origenFK'})
  origen: string;

  @belongsTo(() => Cliente, {name: 'destinoFK'})
  destino: string;

  @belongsTo(() => Encomienda, {name: 'encomiendaFK'})
  encomienda: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
