import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly relacionpropinmueble: HasManyRepositoryFactory<Inmueble, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Propietario, dataSource);
    this.relacionpropinmueble = this.createHasManyRepositoryFactoryFor('relacionpropinmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('relacionpropinmueble', this.relacionpropinmueble.inclusionResolver);
  }
}
