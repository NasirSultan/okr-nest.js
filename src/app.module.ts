import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { RoleModule } from './role/role.module';  // <-- import RoleModule
import { IndustryModule } from './industry/industry.module';
import { UserRoleModule } from './user-role/user-role.module';
import { CreateObjectiveModule } from './create-objective/create-objective.module';
@Module({
  imports: [
    GameModule,
    RoleModule,   // <-- add RoleModule here
    IndustryModule, // <-- add IndustryModule here
    CreateObjectiveModule, // <-- add CreateObjectiveModule here
    UserRoleModule, // <-- add UserRoleModule here
  ],
})
export class AppModule {}
