import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { RoleModule } from './role/role.module';  // <-- import RoleModule
import { IndustryModule } from './industry/industry.module';
import { UserRoleModule } from './user-role/user-role.module';
import { CreateObjectiveModule } from './create-objective/create-objective.module';
import { CreateKeyResultModule } from './create-key-result/create-key-result.module';


@Module({
  imports: [
    GameModule,
    RoleModule,  
    IndustryModule, 
    CreateObjectiveModule, // <-- add CreateObjectiveModule here
    UserRoleModule, 
    CreateKeyResultModule, // <-- add CreateKeyResultModule here
  ],
})
export class AppModule {}
