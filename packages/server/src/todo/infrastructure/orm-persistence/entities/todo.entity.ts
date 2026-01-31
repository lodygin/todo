import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../../../common/entities/timestamp.entity';
import { TODO_PRIORITIES, TodoPriority } from '../../../domain/todo-priority';

@Entity('todos')
export class TodoEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: TODO_PRIORITIES })
  priority!: TodoPriority;

  @Column({ type: 'timestamptz', nullable: true, name: 'completed_at' })
  completedAt!: Date | null;
}
