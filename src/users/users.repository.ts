import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findOneByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
