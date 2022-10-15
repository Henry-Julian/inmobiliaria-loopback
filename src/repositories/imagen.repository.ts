import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Imagen, ImagenRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly relacionimageninmueble: BelongsToAccessor<Inmueble, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Imagen, dataSource);
    this.relacionimageninmueble = this.createBelongsToAccessorFor('relacionimageninmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('relacionimageninmueble', this.relacionimageninmueble.inclusionResolver);
  }
}
