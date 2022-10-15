import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Propietario, Imagen} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {ImagenRepository} from './imagen.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly relacioninmueblepropiet: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  public readonly relacioninmuebleimagenes: HasManyRepositoryFactory<Imagen, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Inmueble, dataSource);
    this.relacioninmuebleimagenes = this.createHasManyRepositoryFactoryFor('relacioninmuebleimagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('relacioninmuebleimagenes', this.relacioninmuebleimagenes.inclusionResolver);
    this.relacioninmueblepropiet = this.createBelongsToAccessorFor('relacioninmueblepropiet', propietarioRepositoryGetter,);
    this.registerInclusionResolver('relacioninmueblepropiet', this.relacioninmueblepropiet.inclusionResolver);
  }
}
